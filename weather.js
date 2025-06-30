
const API_KEY = "5ba92077edeb54d7f582824299aaeb36";

function setWeatherTheme(condition) {
  const bg = document.getElementById("bgImage");
  let gif = "default.gif";

  if (condition.includes("clear")) gif = "clear.gif";
  else if (condition.includes("cloud")) gif = "cloudy.gif";
  else if (condition.includes("rain") || condition.includes("drizzle")) gif = "rain.gif";
  else if (condition.includes("thunderstorm")) gif = "storm.gif";
  else if (condition.includes("snow")) gif = "snow.gif";
  else if (condition.includes("mist") || condition.includes("fog")) gif = "fog.gif";

  const timestamp = new Date().getTime();
  bg.src = gif + "?" + timestamp;
}

function updateWeather() {
  if (!navigator.geolocation) {
    document.getElementById("weatherInfo").textContent = "Geolocation not supported.";
    return;
  }

  navigator.geolocation.getCurrentPosition(success => {
    const { latitude, longitude } = success.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
      .then(response => response.json())
      .then(data => {
        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].description.toLowerCase();
        const city = data.name;
        document.getElementById("weatherInfo").textContent = `${temp}°C ${condition} in ${city}`;
        setWeatherTheme(condition);
      })
      .catch(err => {
        document.getElementById("weatherInfo").textContent = "Weather unavailable.";
        console.error(err);
      });
  }, () => {
    document.getElementById("weatherInfo").textContent = "Location permission denied.";
  });
}

updateWeather();
