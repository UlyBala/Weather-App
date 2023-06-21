import './style.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'


/*Import elements*/
import { getApiWeatherWeek } from './api.js'
import {getApiTimeZone} from "./api.js";
import {IWeather} from "./interface/IWeather";
import {createCard} from "./createCard";
import {addEventCard} from "./createList"
import {ITimeZone} from "./interface/ITimeZone";


/*Dom Elements*/
const input = document.querySelector('.form-control') as HTMLElement;
const time = document.querySelector('.time') as HTMLElement


export const weatherCards = document.querySelector('.weather') as HTMLElement;
export const notFound = document.querySelector('.not-found') as HTMLElement;
export const city = document.querySelector('.city') as HTMLElement;
export const country = document.querySelector('.country') as HTMLElement;
export const loading = document.querySelector('.loading') as HTMLElement
export const introduce = document.querySelector('.introduce') as HTMLElement


let weatherData: IWeather;
let timezone: ITimeZone;

/**
 * Events
 * */
input.addEventListener('keydown', handleEnter)
async function handleEnter(e: KeyboardEvent): Promise<void> {
    const city = (document.querySelector('.form-control') as HTMLInputElement).value
    if (e.key === 'Enter') {
        e.preventDefault();
        weatherData = await getApiWeatherWeek(city);
        check(weatherData)

        timezone = await getApiTimeZone(weatherData)
        time.innerHTML = timezone.date_time_txt

        createCard(weatherData)

        const cards = document.querySelectorAll('.card-item') as NodeListOf<HTMLElement>
        addEventCard(weatherData, cards)
    }
}

/*Check*/
function check(elem: IWeather): void {
    if (elem.cod === '400') {
        classList()
        introduce.classList.add('active')
    }

    if (elem.cod === '404') {
        classList()
        notFound.classList.add('active')
    }
}

function classList() {
    loading.classList.remove('active')
    introduce.classList.remove('active')
    weatherCards.classList.remove('active')
}
