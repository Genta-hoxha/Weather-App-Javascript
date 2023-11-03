const api = {
  //   url: "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}",
  url: "https://api.openweathermap.org/data/2.5/weather?units=metric&q=",
  key: "b3e04946fa11e3be512056b3a7d6c125",
};

let searchBox = document.querySelector(".search input");
let searchBtn = document.querySelector(".search button");
// let displayWeather = document.querySelector("#weather");
const addButton = document.getElementById("addButton");
const slideshow = document.getElementById("slideshow");

let cel;

function checkWeather(cityname) {
  const city = cityname ?? document.getElementById("city").value;
  fetch(`${api.url}${city}&appid=${api.key}`)
    .then((res) => {
      obj = res;
      if (!res.ok) {
        // throw new Error("Unable to fetch weather data.");
        throw alert("Qyteti nuk u gjend!");
      }
      return res.json();
    })
    .then((data) => {
      const tempCelsius = Math.round(data.main.temp);
      const tempMin = data.main.temp_min;
      const tempMax = data.main.temp_max;

      // const tempCelsius = Math.round(data.main.temp);
      // const tempMin = data.main.temp_min;
      // const tempMax = data.main.temp_max;

      const html = `
        <div id="weather">
          <h2 class="city">${data.name}, ${data.sys.country}</h2>
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" class="weathericon">
          <h1 class="temp">${tempCelsius} °C</h1>
          <h3 class="description">${data.weather[0].description}</h3>
          <div class="degree-button">
            <h3 class="tempMin">Temp.min: ${tempMin} <button id="celsiusButton" onclick="convertToCelsius()">°C</button> /
            <button id="fahrenheitButton" onclick="convertToFahrenheit()">°F</button> </h3>
                   <h3 class="tempMax">Temp.max: ${tempMax} <button id="celsiusButton" onclick="convertToCelsius()">°C</button> /
            <button id="fahrenheitButton" onclick="convertToFahrenheit()">°F</button>
            </h3>
          </div>
          <center>
          <div class="temperature-strip">
          <div class="strip"></div>
      </div>
      </center>

          <div class="details">
            <div class="col">
              <i class="fa-solid fa-water fa-2x"></i>
              <div>
                <p class="humidity"></p>
                <p>${data.main.humidity} %</p>
              </div>
            </div>
            <div class="col">
              <i class="fa-solid fa-wind fa-2x"></i>
              <div>
                <p class="wind"></p>
                <p>${data.wind.speed} km/h</p>
              </div>
            </div>
          </div>
        </div>
              `;
      const weather = document.getElementById("weather");
      weather.innerHTML = html;

      const range = tempMax - tempMin;
      const position = tempCelsius - tempMin;
      const percentage = (position / range) * 100;

      const temperatureStrip = document.querySelector(".strip");

      temperatureStrip.style.width = `${percentage}%`;

      if (tempCelsius < tempMin) {
        temperatureStrip.style.backgroundColor = "blue";
      } else if (tempCelsius > tempMax) {
        temperatureStrip.style.backgroundColor = "red";
      } else {
        temperatureStrip.style.backgroundColor = "green";
      }

      cel = tempCelsius;
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
    });
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

function convertToCelsius() {
  if (cel !== undefined) {
    const displayWeather = document.getElementById("weather");
    displayWeather.querySelector(".temp").textContent = `${cel} °C`;
    // displayWeather.querySelector(".tempMaxMin").textContent = `${cel} °C`;
  }
}
// convertToCelsius();
function convertToFahrenheit() {
  if (cel !== undefined) {
    const displayWeather = document.getElementById("weather");
    const fahrenheit = Math.round((cel * 9) / 5 + 32);
    displayWeather.querySelector(".temp").textContent = `${fahrenheit} °F`;
    // displayWeather.querySelector(
    //   ".tempMaxMin"
    // ).textContent = `${fahrenheit} °F`;
  }
}

let saveData = [];
addButton.addEventListener("click", () => {
  // console.log("hello");
  saveData.push(searchBox.value);
  let span = document.createElement("span");
  span.className = "dot";
  slideshow.appendChild(span);

  if (saveData.length == 1) {
    let dots = slideshow.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active");
    });
  }
});

document.addEventListener("click", (e) => {
  if (e.target.className === "dot") {
    console.log(saveData, e.target);
    e.stopPropagation();
    checkWeather(saveData[Array.from(slideshow.children).indexOf(e.target)]);

    let cityName =
      saveData[Array.prototype.indexOf.call(slideshow.children, e.target)];

    const index = saveData.indexOf(cityName);
    console.log(index);

    let dots = slideshow.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.toggle("active");
      } else {
        dot.classList.remove("active");
      }
    });
    console.log(dots);
    // dots[0].classList.toggle("active");
    // checkWeather(
    //   saveData[Array.prototype.indexOf.call(slideshow.children, e.target)]
    // );
  }
});
