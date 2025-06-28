
// Clock Display
function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// Weather API (with placeholder key)
navigator.geolocation.getCurrentPosition(pos => {
  const { latitude, longitude } = pos.coords;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_API_KEY_HERE&units=metric`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("weather").textContent = `${data.main.temp}°C, ${data.weather[0].description}`;
    }).catch(() => {
      document.getElementById("weather").textContent = "Weather unavailable.";
    });
});

// Theme Toggle
function toggleMode() {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
}

// Welcome Animation
window.onload = () => {
  const welcome = document.getElementById("welcome");
  welcome.style.opacity = 1;
  setTimeout(() => {
    welcome.style.opacity = 0;
    setTimeout(() => welcome.style.display = "none", 2000);
  }, 3000);
};
