import {Component, OnInit, Input} from '@angular/core';
const $ = require('jquery');

@Component({
    selector: 'weather-component',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
    @Input() fontColor: string = '#000000';
    title = 'WeatherComponent';

    weatherContent: string = '';

    // 天气
    setWeather(): void {
        let tempThis = this;
        $.ajax({
            url: "https://v2.jinrishici.com/info",
            type: "GET",
            success: function (result: any) {
                if (result.status === "success") {
                    if (result.data.weatherData) {
                        let weatherData = result.data.weatherData;
                        tempThis.weatherContent = weatherData.temperature + '°C｜' + weatherData.weather;
                    }
                } else {

                }
            },
            error: function (err: any) {

            }
        });
    }

    ngOnInit(): void {
        this.setWeather();     // 天气
    }
}