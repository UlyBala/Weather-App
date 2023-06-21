import { URLWEATHER, APIKEYWEATHER, URLTIMEZONE, APIKEYTIMEZONE } from './config.js'
import {introduce, weatherCards, notFound, loading} from "./main";
import {IWeather} from "./interface/IWeather";


export async function getApiWeatherWeek(city: string) {
    try {
        const res = await fetch(`${URLWEATHER}?q=${city}&appid=${APIKEYWEATHER}`)
        introduce.classList.remove('active')
        weatherCards.classList.remove('active')
        notFound.classList.remove('active')
        loading.classList.add('active')
        return await res.json()
    } catch (e) {
        throw new Error('Error: ' + e)
    }
}


export async function getApiTimeZone(weather: IWeather) {
    const {country, name} = weather.city

    try {
        const res = await fetch(`${URLTIMEZONE}?apiKey=${APIKEYTIMEZONE}&location=${name},%20${country}`)
        return await res.json()
    } catch (e) {
        throw new Error('Error: ' + e)
    }
}
