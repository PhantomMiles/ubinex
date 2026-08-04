// productionData.js
export const productionAnalytics = {
  labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
  datasets: {
    previous: {
      label: "Previous Period",
      color: "#D6C7BC", // Slate 300
      data: [15, 25, 38, 45, 50, 32, 20, 48, 70, 40, 18, 55],
      items: [
        "Yellow Corn: 1.5 T", "Cassava: 2.5 T", "Yam: 3.8 T", "Sorghum: 4.5 T", 
        "Groundnut: 5.0 T", "Cocoa: 3.2 T", "Oil Palm: 2.0 T", "Nsukka Pepper: 4.8 T", 
        "Tomatoes: 7.0 T", "Onions: 4.0 T", "Rice: 1.8 T", "Sesame: 5.5 T"
      ]
    },
    current: {
      label: "Current Period",
      color: "#2d5016", // Emerald 500
      data: [22, 35, 50, 62, 68, 45, 28, 65, 95, 58, 25, 78],
      items: [
        "Yellow Corn: 2.2 T", "Cassava: 3.5 T", "Yam: 5.0 T", "Sorghum: 6.2 T", 
        "Groundnut: 6.8 T", "Cocoa: 4.5 T", "Oil Palm: 2.8 T", "Nsukka Pepper: 4.2 T", 
        "Tomatoes: 9.5 T", "Onions: 5.8 T", "Rice: 2.5 T", "Sesame: 7.8 T"
      ]
    }
  }
};