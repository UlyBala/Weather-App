/*Create Card*/
import { IWeather, IWeatherList } from "./interface/IWeather";
import { orderDays } from "./orderDays";
import { convertKelvinToCelsius } from "./convertTemperature";
import {weatherCards, notFound, city, country, loading} from "./main";

const rowCards = document.querySelector('.row-cards') as HTMLElement;


export function createCard(weather: IWeather) {
    rowCards.innerHTML = ''
    const days = orderDays(weather.list)

    for (let day in days) {
        days[day].find((weatherList: IWeatherList) => {
            if (weatherList.dt_txt.slice(11) === '12:00:00') {
                rowCards.innerHTML += form(weatherList, day)
            }
        })
    }

    city.innerHTML = weather.city.name;
    country.innerHTML = weather.city.country;
    weatherCards.classList.add('active')
    notFound.classList.remove('active')
    loading.classList.remove('active')
}


function form(weatherList: IWeatherList, id: string) {
    const { main, description, icon } = weatherList.weather[0]
    const { temp_max, temp_min, humidity } = weatherList.main

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = new Date(weatherList.dt_txt).getDay()

    let colorWeather = ''
    if (main === 'Clear') colorWeather = '#5bc9ff'
    if (main === 'Clouds') colorWeather = '#81a5ba'
    if (main === 'Rain') colorWeather = '#0e1a26'

    return `
      <div id="${id}" class="card-item mb-3 col-sm-12 col-md-6 col-lg-4 col-xl-3" type="button" data-bs-toggle="modal" data-bs-target="#all-information">
        <div id="${colorWeather}" class="card card-itd" style="background-color: ${colorWeather}">
          <div class="card-body">
          	<div class="d-flex align-items-center justify-content-between">
          		<span class="description fs-4">${main}</span>
          		<div class="fs-5">${description}</div>
          		<img class="weather-img" src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="">
          	</div>
          	
    		<div class="d-flex justify-content-between align-items-center my-1">
                <span class="degree fs-4">${convertKelvinToCelsius(temp_min)}/${convertKelvinToCelsius(temp_max)} &#8451</span>
    			<span class="data fs-4">${weekday[day]}</span>
    		</div>

    		<div class="d-flex justify-content-between my-1">
                <div class="d-flex">
                    <i class="bi bi-water fs-2 fs-xxl-6"></i>
                    <div class="d-flex flex-column mx-xxl-1 mx-2">
                        <span class="humidity-percent">${humidity}%</span>
                        <p class="humidity">Humidity</p>
                    </div>
                </div>

                <div class="d-flex">
                    <i class="bi bi-wind fs-2"></i>
                    <div class="d-flex flex-column mx-xxl-1 mx-2">
                        <span class="wind-km">${Math.round(weatherList.wind.speed)}Km/h</span>
                        <p class="wind">Wind</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    `
}


