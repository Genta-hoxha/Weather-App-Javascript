const api = {
  //   url: "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}",
  url: "https://api.openweathermap.org/data/2.5/weather?units=metric&q=",
  key: "b3e04946fa11e3be512056b3a7d6c125",
};

var obj;
let searchBox = document.querySelector(".search input");
let searchBtn = document.querySelector(".search button");
// let displayWeather = document.querySelector("#weather");
let addBtn = document.querySelector(".add");
const slideshow = document.getElementById("addDot");
const dotsContainer = document.createElement("div"); // Container for dots
dotsContainer.className = "dot-bar";
slideshow.appendChild(dotsContainer);

const state = {};
let cel;
let slideIndex = 0;
function checkWeather() {
  const city = document.getElementById("city").value;
  fetch(`${api.url}${city}&appid=${api.key}`)
    .then((res) => {
      obj = res;
      if (!res.ok) {
        throw new Error("Unable to fetch weather data.");
      }
      return res.json();
    })
    .then((data) => {
      console.log("jjaj", data);
      const tempCelsius = Math.round(data.main.temp);
      const html = `
        <div id="weather">
          <h2 class="city">${data.name}, ${data.sys.country}</h2>
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" class="weathericon">
          <h1 class="temp">${tempCelsius} °C</h1>
          <div class="degree-button">
            <h3 class="tempMin">Temp.min: ${data.main.temp_min} <button id="celsiusButton" onclick="convertToCelsius()">°C</button> /
            <button id="fahrenheitButton" onclick="convertToFahrenheit()">°F</button> </h3>
                   <h3 class="tempMax">Temp.max: ${data.main.temp_max} <button id="celsiusButton" onclick="convertToCelsius()">°C</button> /
            <button id="fahrenheitButton" onclick="convertToFahrenheit()">°F</button>
            </h3>
          </div>
          <h3 class="description">${data.weather[0].description}</h3>
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

function clickAddBtn() {
  console.log("hello");
  localStorage.setItem("weather", JSON.stringify(state.bookmarks));
}

// function addSlideToSlideshow() {
//   const currentPage = weather;
//   const newSlide = document.createElement("div");
//   newSlide.className = "slide";
//   newSlide.innerHTML = currentPage;
//   slideshow.appendChild(newSlide);

//   // Create a new dot and add it to the dots container
//   const newDot = document.createElement("span");
//   newDot.className = "dot";
//   newDot.onclick = () => showSlide(slideIndex);
//   slideshow.appendChild(newDot);

//   // Increment the slide index
//   slideIndex++;

//   if (slideIndex === 1) {
//     showSlide(0);
//   }
// }

// function showSlide(index) {
//   const slides = slideshow.querySelectorAll(".slide");
//   const dots = dotsContainer.querySelectorAll(".dot");

//   slides.forEach((slide) => (slide.style.display = "none"));
//   slides[index].style.display = "block";

//   dots.forEach((dot) => dot.classList.remove("active"));
//   dots[index].classList.add("active");
// }

// // Add click event to the "Add" button
// addBtn.addEventListener("click", addSlideToSlideshow);

// convertToFahrenheit();
/*
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

//Celsius to Fahrenheit
function celsiusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}

async function checkWeather(city) {
  const res = await fetch(api.url + city + `&appid=${api.key}`);
  let data = await res.json();
  if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  console.log(res, data);

  const html = `
    <div class="weather">
            <h2 class="city">${data.name}, ${data.sys.country}</h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" class="weathericon">

            
            <h1 class="temp">${data.main.temp}</h1>
           

            <h3 class="tempMaxMin">${data.main.temp_min} <button class ="°C" onclick ="convertToCelsius()">°C</button> / <button onclick="convertToFahrenheit()" class ="°F">°F</button></h3>
            <h3 class="description">${data.weather[0].description}</h3>
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
  displayWeather.innerHTML = "";
  displayWeather.insertAdjacentHTML("afterbegin", html);
  //   displayWeather.style.opacity = 1;
  displayWeather.textContent = displayWeather();
}
const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

checkWeather();
*/
