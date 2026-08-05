/**
 * Maps WMO weather codes and meteorological conditions to human-readable status, 
 * FontAwesome icon, theme colors, and regional agricultural alerts (Floods, Thunderstorms, Pests, etc.)
 */
function getWeatherDetails(code, isDay = 1, temp = 30, humidity = 50) {
  let details = {
    status: "Clear",
    icon: "fa-sun",
    color: "text-amber-500",
    bgAccent: "bg-amber-500/10",
    alerts: [] // Stores active agricultural alerts
  };

  // Base Condition Mapping (WMO Standard)
  if (code === 0) {
    details = isDay 
      ? { ...details, status: "Sunny", icon: "fa-sun", color: "text-amber-500", bgAccent: "bg-amber-500/10" }
      : { ...details, status: "Clear Night", icon: "fa-moon", color: "text-indigo-400", bgAccent: "bg-indigo-500/10" };
  } else if ([1, 2, 3].includes(code)) {
    details = isDay
      ? { ...details, status: "Partly Cloudy", icon: "fa-cloud-sun", color: "text-sky-500", bgAccent: "bg-sky-500/10" }
      : { ...details, status: "Cloudy Night", icon: "fa-cloud-moon", color: "text-slate-400", bgAccent: "bg-slate-500/10" };
  } else if ([45, 48].includes(code)) {
    details = { ...details, status: "Foggy", icon: "fa-smog", color: "text-gray-400", bgAccent: "bg-gray-500/10" };
  } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    details = { ...details, status: "Rainy", icon: "fa-cloud-showers-heavy", color: "text-blue-500", bgAccent: "bg-blue-500/10" };
  } else if ([95, 96, 99].includes(code)) {
    details = { ...details, status: "Thunderstorm", icon: "fa-bolt", color: "text-yellow-500", bgAccent: "bg-yellow-500/10" };
  }

  // --- AGRICULTURAL ALERT LOGIC ENGINES ---

  // ⚡ 1. Severe Thunderstorm Warning (WMO Codes 95, 96, 99)
  if ([95, 96, 99].includes(code)) {
    details.alerts.push({
      id: "thunderstorm-warning",
      type: "THUNDERSTORM",
      title: "Severe Thunderstorm & Wind Hazard",
      message: "Lightning and gusty winds reported. Secure loose farm machinery, stay clear of isolated tall trees, and secure greenhouse coverings.",
      badgeColor: "bg-yellow-500 text-gray-950",
      borderColor: "border-yellow-500",
      bgColor: "bg-yellow-500/10",
      icon: "fa-bolt"
    });
  }

  // 🌊 2. Heavy Rain & Flash Flood / Waterlogging Risk (WMO Rain Codes + Severe Thunderstorms)
  if ([61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code)) {
    details.alerts.push({
      id: "flood-warning",
      type: "FLOOD",
      title: "Flash Flood & Waterlogging Hazard",
      message: "Heavy rainfall detected. Clear drainage channels, protect stored harvests, and avoid low-lying field operations.",
      badgeColor: "bg-red-500 text-white",
      borderColor: "border-red-500",
      bgColor: "bg-red-500/10",
      icon: "fa-water"
    });
  }

  // 🐛 3. High Heat + Elevated Humidity = Pest & Fungal Risk Spike
  if (temp >= 29 && humidity >= 70) {
    details.alerts.push({
      id: "pest-risk",
      type: "PEST_PATHOGEN",
      title: "Elevated Pest & Blight Hazard",
      message: "High temperature combined with heavy atmospheric moisture creates prime breeding ground for armyworms and leaf mold.",
      badgeColor: "bg-amber-500 text-white",
      borderColor: "border-amber-500",
      bgColor: "bg-amber-500/10",
      icon: "fa-bug"
    });
  }

  return details;
}

export async function getRealTimeWeather(defaultLat = 6.4584, defaultLng = 7.5464) {
  return new Promise((resolve) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const data = await fetchWeatherData(latitude, longitude);
          resolve(data);
        },
        async () => {
          const data = await fetchWeatherData(defaultLat, defaultLng);
          resolve(data);
        }
      );
    } else {
      fetchWeatherData(defaultLat, defaultLng).then(resolve);
    }
  });
}

async function fetchWeatherData(lat, lng) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&daily=temperature_2m_max,uv_index_max&timezone=auto`
    );
    
    if (!response.ok) throw new Error("Failed to fetch weather data");
    
    const data = await response.json();
    const isDay = data.current.is_day;
    const temp = Math.round(data.current.temperature_2m);
    const humidity = data.current.relative_humidity_2m;
    
    const weatherDetails = getWeatherDetails(data.current.weather_code, isDay, temp, humidity);

    return {
      temp,
      highTemp: Math.round(data.daily.temperature_2m_max[0]),
      humidity,
      windSpeed: Math.round(data.current.wind_speed_10m),
      uvIndex: data.daily.uv_index_max[0],
      isDay: Boolean(isDay),
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...weatherDetails,
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}