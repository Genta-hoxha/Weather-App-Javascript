const api = {
  //   url: "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}",
  url: "https://api.openweathermap.org/data/2.5/weather?units=metric&q=",
  key: "b3e04946fa11e3be512056b3a7d6c125",
};
const language = "en";
let searchBox = document.querySelector(".search input");
let searchBtn = document.querySelector(".search button");
// let displayWeather = document.querySelector("#weather");
const addButton = document.getElementById("addButton");
const slideshow = document.getElementById("slideshow");
let mainIndex;
let mainData;
let cel;
const deleteButton = document.getElementById("deleteBtn");
const activeSpan = document.querySelector(".dot.active");
const newActivespan = document.querySelector(".dot");

function checkWeather(cityname) {
  const city = cityname ?? document.getElementById("city").value;
  fetch(`${api.url}${city}+ &lang=${language} + &appid=${api.key}`)
    .then((res) => {
      obj = res;
      if (!res.ok) {
        // throw new Error("Unable to fetch weather data.");
        throw alert("Qyteti nuk u gjend!");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      mainData = data.name;
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

      let temperatureStrip = document.querySelector(".strip");
      console.log(percentage);
      temperatureStrip.style.width = `${percentage}% !important`;
      temperatureStrip.style.background =
        "linear-gradient(90deg, rgba(0,5,172,1) 0%, rgba(255,0,0,1) 100%)";

      // if (tempCelsius < tempMin) {
      //   temperatureStrip.style.backgroundColor = "blue";
      // } else {
      //   temperatureStrip.style.backgroundColor = "red";
      // } else {
      //   temperatureStrip.style.backgroundColor = "green";
      // }
      // }
      cel = tempCelsius;
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
    });
}

//FUNKSIONI PER ENTER
function enterClick(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    checkWeather(searchBox.value);
    console.log(searchBox);
    addButton.disabled = false;
  }
}

//FUNKSIONI PER SEARCH BUTTON
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
  addButton.disabled = false;
});

//FUNKSIONI PER CELSIUS
function convertToCelsius() {
  if (cel !== undefined) {
    const displayWeather = document.getElementById("weather");
    displayWeather.querySelector(".temp").textContent = `${cel} °C`;
  }
}

//FUNKSIONI PER FAHRENHEIT
function convertToFahrenheit() {
  if (cel !== undefined) {
    const displayWeather = document.getElementById("weather");
    const fahrenheit = Math.round((cel * 9) / 5 + 32);
    displayWeather.querySelector(".temp").textContent = `${fahrenheit} °F`;
  }
}
addButton.disabled = true;

//FUNKSIONI PER ADD BUTTONIN
let saveData = [];
let arrDot = [];
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
addButton.addEventListener("click", () => {
  prevBtn.style.display = "none";
  nextBtn.style.display = "none";

  // Push the city name to the saveData array
  const city = searchBox.value;
  searchBox.value = "";
  const cityFirstCapital = city.charAt(0).toUpperCase() + city.slice(1);
  console.log(cityFirstCapital);
  saveData.push(mainData);
  console.log(saveData);

  const index = saveData.indexOf(cityFirstCapital);
  mainIndex = index;
  console.log(index);

  const existValue = saveData.includes(cityFirstCapital);

  //kushti qe te mos shtyjme te njejtin qytet
  if (existValue == true) {
    console.log(addButton);
    addButton.disabled = true;
  } else {
    addButton.disabled = false;
  }

  console.log(existValue);

  let span = document.createElement("span");
  span.className = "dot";

  arrDot.push(span);
  const indexActive = arrDot.findIndex((element) =>
    element.classList.contains("active")
  );
  // console.log(indexActive + 1);

  //KUSHTET PER PREV

  if (arrDot.length > 1) {
    if (indexActive + 1 === 0) {
      prevBtn.className.add("disabled");
      // prevBtn.disabled = true;
    }

    prevBtn.classList.remove("disabled");
    //shfaqja e dy "butonave" prev dhe next pas shtimit te qytetit te dyte
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
  }

  //kushti kur kemi arrDot.length me te madhe se numri i recordeve

  slideshow.appendChild(span);
  deleteBtn.style.display = "block";

  arrDot.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      // console.log(i);
      if (i === index) {
        checkWeather(cityFirstCapital);
      }
    });
  });

  let dots = slideshow.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    if (i === mainIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
    dot.addEventListener("click", () => {
      dots.forEach((dot) => {
        dot.classList.remove("active");
      });
      dot.classList.add("active");
    });
  });
  updatePagination(indexActive + 1);
});

deleteButton.addEventListener("click", () => {
  const activeSpan = document.querySelector(".dot.active");
  const displayWeather = document.querySelector("#weather");
  // console.log("hi");
  // console.log(arrDot);
  const indexActive = arrDot.findIndex((element) =>
    element.classList.contains("active")
  );
  // console.log(indexActive, saveData);

  //KUSHTI PER ARRAY DOT QE TI FSHIJME
  if (arrDot.length === 1) {
    // console.log("ka 1 element", arrDot, saveData);
    // console.log(displayWeather);
    saveData.splice(indexActive, 1);
    arrDot.splice(indexActive, 1);
    // console.log(activeSpan);
    activeSpan.remove();
    // console.log(saveData);
    displayWeather.remove();
    deleteButton.remove();
    prevBtn.remove();
    nextBtn.remove();
  } else if (arrDot.length > 0) {
    // console.log("ka me shume elemente", arrDot, saveData);
    saveData.splice(indexActive, 1);
    arrDot.splice(indexActive, 1);
    // console.log(activeSpan);
    activeSpan.remove();
    // console.log(saveData);
    arrDot[arrDot.length - 1].classList.add("active");
    // console.log(saveData[saveData.length - 1]);
    checkWeather(saveData[saveData.length - 1]);
    // console.log("fggf", arrDot.length, saveData.length);
  }
});

//PAGINATION

// let currentPage = indexActive;
// console.log(currentPage);
const totalPages = arrDot.length;
const dotsToShow = 3;
// const pageCount = Math.ceil(arrDot.length / dotsToShow);
const indexActive = arrDot.findIndex((element) =>
  element.classList.contains("active")
);

//FUNKSIONI PER PREV PAGE
function prevPage() {
  nextBtn.classList.remove("disabled");
  // console.log("prev");
  // console.log("prev", currentPage);
  let currentPage = arrDot.findIndex((element) =>
    element.classList.contains("active")
  );
  console.log(currentPage);
  console.log(arrDot[currentPage]);
  currentPage--;
  if (arrDot[currentPage + 1] && arrDot[currentPage]) {
    arrDot[currentPage + 1].classList.remove("active");
    arrDot[currentPage].classList.add("active");
  }
  // if (currentPage === 0) {
  //   prevBtn.classList.add("disabled");
  // } else {
  //   prevBtn.classList.remove("disabled");
  // }
  checkWeather(saveData[currentPage]);
  console.log(currentPage);
  // updatePagination(currentPage);
}

//FUNKSIONI PER NEXT PAGE
function nextPage() {
  // console.log("next");
  let currentPage = arrDot.findIndex((element) =>
    element.classList.contains("active")
  );
  console.log(currentPage);
  currentPage++;
  if (arrDot[currentPage - 1] && arrDot[currentPage]) {
    arrDot[currentPage - 1].classList.remove("active");
    arrDot[currentPage].classList.add("active");
    checkWeather(saveData[currentPage]);
  }
  // console.log(currentPage);
  // arrDot[currentPage - 1].classList.remove("active");

  if (currentPage > 0) {
    prevBtn.classList.remove("disabled");
  } else {
    prevBtn.classList.add("disabled");
  }
  // updatePagination(currentPage);
}

function updatePagination(currentPage) {
  console.log(currentPage);
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    console.log(index + 1, dotsToShow, currentPage, Math.floor(dotsToShow / 2));
    if (
      index + 1 >= currentPage - Math.floor(dotsToShow / 2) &&
      index + 1 <= currentPage + Math.floor(dotsToShow / 2)
    ) {
      console.log(dot, index);
      dot.style.display = "inline-block";
    } else {
      console.log("2", dot, index);
      // dot.classList.add("hidden");
      dot.style.display = "none";
    }
  });
}
