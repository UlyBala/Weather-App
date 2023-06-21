import { IWeatherList } from "./IWeather";

export interface IOrderDays {
    [key: string]: [IWeatherList]
}
