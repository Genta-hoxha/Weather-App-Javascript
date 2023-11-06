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

      if (tempCelsius < tempMin) {
        temperatureStrip.style.backgroundColor = "blue";
      } else {
        temperatureStrip.style.backgroundColor = "red";
        // } else {
        //   temperatureStrip.style.backgroundColor = "green";
        // }
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
  addButton.disabled = false;
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
addButton.disabled = true;
//funksioni per add button
let saveData = [];
let arrDot = [];
addButton.addEventListener("click", () => {
  console.log(mainData);

  // Push the city name to the saveData array
  const city = searchBox.value;
  const cityFirstCapital = city.charAt(0).toUpperCase() + city.slice(1);
  console.log(cityFirstCapital);
  saveData.push(mainData);
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
  slideshow.appendChild(span);

  deleteBtn.style.display = "block";

  arrDot.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      console.log(i);
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
});

// span.addEventListener("click", () => {});
// let saveData = [];
// addButton.addEventListener("click", () => {
//   // console.log("hello");
//   //mbushja e array me te dhenat e qyteteve
//   saveData.push(searchBox.value);

//   let span = document.createElement("span");
//   span.className = "dot";
//   slideshow.appendChild(span);
//   //shfaqim koshin kur klikojme buttonin add
//   deleteBtn.style.display = "block";

//   if (saveData.length === 1) {
//     let dots = slideshow.querySelectorAll(".dot");
//     dots.forEach((dot, i) => {
//       dot.classList.toggle("active");
//     });
//   }

//   saveData.forEach((element, index) => {
//     console.log(element);
//     element.addEventListener("click", () => {
//       alert(`click ${index + 1}: ${element.textContent}`);
//     });
//   });
// });

/*
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
  console.log("hello");
});

*/

// const deleteButton = document.getElementById("deleteBtn");
// deleteButton.addEventListener("click", () => {
//   const activeDot = slideshow.querySelector(".dot.active");
//   if (activeDot) {
//     const index = Array.from(slideshow.children).indexOf(activeDot);

//     if (index > -1) {
//       slideshow.removeChild(slideshow.children[index]);
//       saveData.splice(index, 1);
//     }

//     if (saveData.length === 0) {
//       const displayWeather = document.getElementById("weather");
//       displayWeather.remove();
//       deleteButton.remove();
//     } else if (index === saveData.length) {
//       const dots = slideshow.querySelectorAll(".dot");
//       if (dots.length > 0) {
//         dots[dots.length - 1].classList.add("active");
//         checkWeather(saveData[dots.length - 1]);
//       }
//     }
//   }
// });

/*
const deleteButton = document.getElementById("deleteBtn");
deleteButton.addEventListener("click", () => {
  console.log("genta");

  //kur kemi vetem nje qytet do ikim serish ne gjendjenm fillestare
  let dots = slideshow.querySelectorAll(".dot");
  if (saveData.length == 1) {
    let displayWeather = document.getElementById("weather");
    displayWeather.style.display = "none";
    deleteBtn.style.display = "none";
    // dotActive.style.display = "none";
  }

  //kur kemi me shume se nje qytet si do funksionoje butoni i remove
  else {
    let dots = slideshow.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.toggle("active");
      } else {
        dot.classList.remove("active");
      }
    });

    let cityName =
      saveData[Array.prototype.indexOf.call(slideshow.children, e.target)];

    const index = saveData.indexOf(cityName);
    console.log(index);

    let dotSlideshow = document.getElementById("slideshow");
    let childActive = document.querySelector(".active");

    dotSlideshow.removeChild(childActive);
    let dotCurr = document.querySelector(".dot");
    let removeActive = slideshow.children[dotCurr];
    if (removeActive === searchBox.length) {
      removeActive.remove();
      dotActive.remove();
      index.remove();
    }
  }
});


*/
