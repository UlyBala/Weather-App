import {convertKelvinToCelsius} from "./convertTemperature";
import {IWeather, IWeatherList} from "./interface/IWeather";
import {orderDays} from "./orderDays";


const modalContent = document.querySelector('.modal-content') as HTMLElement
const modalTitle = document.querySelector('.modal-title') as HTMLElement
const weatherTime = document.querySelector('.weather-time') as HTMLElement


export function addEventCard(weather: IWeather, cards: NodeListOf<HTMLElement>): void {
    for (let i: number = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', (e:MouseEvent): void => {
            const day = e.target.nextSibling.parentNode.id
            modalTitle.innerHTML = week(day)
            modalContent.style.backgroundColor = e.target.id
            createList(weather, day)
        })
    }
}


function createList(weather: IWeather, day: string): void {
    const days = orderDays(weather.list)
    weatherTime.innerHTML = ''
    weatherTime.innerHTML = form(days[day])
}


function week(day: string) {
    const weekDays= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekDay: number = new Date(day).getDay()

    if (weekDays[weekDay] === 'Monday') return 'Monday'
    if (weekDays[weekDay] === 'Tuesday') return 'Tuesday'
    if (weekDays[weekDay] === 'Wednesday') return 'Wednesday'
    if (weekDays[weekDay] === 'Thursday') return 'Thursday'
    if (weekDays[weekDay] === 'Friday') return 'Friday'
    if (weekDays[weekDay] === 'Saturday') return 'Saturday'
    if (weekDays[weekDay] === 'Sunday') return 'Sunday'
}


function form(weather: IWeatherList[]): string {
    let htmlString = ''
    console.log(weather)
    weather.forEach((weatherList: IWeatherList) => {
        let {main, description, icon} = weatherList.weather[0]
        let {temp_max, temp_min, humidity} = weatherList.main
        let daytime = weatherList.dt_txt.slice(-9)

        htmlString += `
            <li class="d-flex justify-content-between align-items-center border-bottom">
                <div>
                    <span>${daytime}</span>
                    <span class="mx-2">${convertKelvinToCelsius(temp_min)}/${convertKelvinToCelsius(temp_max)} &#8451</span>
                    <span class="humidity-percent">${humidity}%</span>
                    <span class="wind-km">${Math.round(weatherList.wind.speed)}Km/h</span>
                </div>
    
                <div class="">
                    <span>${description}</span>
                    <img src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="">
                </div>
            </li>
        `
    })

    return htmlString;
}
