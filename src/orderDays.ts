import { IWeatherList } from "./interface/IWeather";
import { IOrderDays } from "./interface/IOrderDays";

/**
 * Create Object order days
 * */
export function orderDays(weathers: IWeatherList[]): IOrderDays {
    let orderDays: IOrderDays = {}
    weathers.forEach((weather: IWeatherList) => {
        let day = weather.dt_txt.slice(0, -9)
        if (!orderDays.hasOwnProperty(day)) {
            orderDays[day] = [weather]
        } else {
            orderDays[day].push(weather)
        }
    })
    return orderDays;
}
