/**
 * Maps WMO weather codes to human-readable status, FontAwesome icon, and theme colors
 */
function getWeatherDetails(code, isDay = 1) {
  // WMO Weather interpretation codes (https://open-meteo.com/en/docs)
  if (code === 0) {
    return isDay 
      ? { status: "Sunny", icon: "fa-sun", color: "text-amber-500", bgAccent: "bg-amber-500/10" }
      : { status: "Clear Night", icon: "fa-moon", color: "text-indigo-400", bgAccent: "bg-indigo-500/10" };
  }
  if ([1, 2, 3].includes(code)) {
    return isDay
      ? { status: "Partly Cloudy", icon: "fa-cloud-sun", color: "text-sky-500", bgAccent: "bg-sky-500/10" }
      : { status: "Cloudy Night", icon: "fa-cloud-moon", color: "text-slate-400", bgAccent: "bg-slate-500/10" };
  }
  if ([45, 48].includes(code)) {
    return { status: "Foggy", icon: "fa-smog", color: "text-gray-400", bgAccent: "bg-gray-500/10" };
  }
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return { status: "Rainy", icon: "fa-cloud-showers-heavy", color: "text-blue-500", bgAccent: "bg-blue-500/10" };
  }
  if ([95, 96, 99].includes(code)) {
    return { status: "Thunderstorm", icon: "fa-bolt", color: "text-yellow-500", bgAccent: "bg-yellow-500/10" };
  }
  
  return isDay
    ? { status: "Clear", icon: "fa-sun", color: "text-amber-500", bgAccent: "bg-amber-500/10" }
    : { status: "Clear Night", icon: "fa-moon", color: "text-indigo-400", bgAccent: "bg-indigo-500/10" };
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
    const weatherDetails = getWeatherDetails(data.current.weather_code, isDay);

    return {
      temp: Math.round(data.current.temperature_2m),
      highTemp: Math.round(data.daily.temperature_2m_max[0]),
      humidity: data.current.relative_humidity_2m,
      windSpeed: Math.round(data.current.wind_speed_10m),
      uvIndex: data.daily.uv_index_max[0],
      isDay: Boolean(isDay),
      ...weatherDetails,
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}