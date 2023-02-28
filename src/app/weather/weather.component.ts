import {Component, OnInit, Input} from '@angular/core';
import {getWeatherIcon} from "../../public/publicFunctions";
const bootstrap = require('bootstrap');
const $ = require('jquery');

@Component({
    selector: 'weather-component',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
    @Input() fontColor: string = '#000000';
    title = 'WeatherComponent';
    weatherIcon: string = ''
    weatherContent: string = '';
    location: string = '暂无地区信息';
    humidity: string = '暂无湿度信息';
    pm25: string = '暂无PM2.5信息';
    rainfall: string = '暂无降雨信息';
    visibility: string = '暂无视距信息';
    windInfo: string = '暂无风况信息';
    

    // 天气
    setWeather(): void {
        let tempThis = this;
        $.ajax({
            url: "https://v2.jinrishici.com/info",
            type: "GET",
            success: function (resultData: any) {
                if (resultData.status === "success") {
                    if (resultData.data.weatherData) {
                        let weatherData = resultData.data.weatherData;
                        tempThis.weatherIcon = getWeatherIcon(weatherData.weather);
                        tempThis.weatherContent = weatherData.weather + '｜' + weatherData.temperature + '°C';
                        tempThis.location = resultData.data.region.replace("|", " · ");
                        tempThis.humidity = resultData.data.weatherData.humidity;
                        tempThis.pm25 = resultData.data.weatherData.pm25;
                        tempThis.rainfall = resultData.data.weatherData.rainfall + "%";
                        tempThis.visibility = resultData.data.weatherData.visibility;
                        tempThis.windInfo = resultData.data.weatherData.windDirection + resultData.data.weatherData.windPower + "级";

                        // 更新 popover
                        let contentHtml =
                            "<div>" +
                            "<p><i class=\"bi bi-moisture\"></i> 空气湿度：" + tempThis.humidity + "</p>" +
                            "<p><i class=\"bi bi-water\"></i> 空气质量：" + tempThis.pm25 + "</p>" +
                            "<p><i class=\"bi bi-cloud-rain\"></i> 降雨概率：" + tempThis.rainfall + "</p>" +
                            "<p><i class=\"bi bi-eye\"></i> 视线距离：" + tempThis.visibility + "</p>" +
                            "<p><i class=\"bi bi-wind\"></i> 风速情况：" + tempThis.windInfo + "</p>" +
                            "</div>";

                        let weatherP = $('#weatherP');
                        let popover = new bootstrap.Popover(weatherP, {
                            html: true,
                            title: tempThis.location,
                            content: contentHtml,
                            offset: "10, 10"
                        })

                        weatherP.on('shown.bs.popover', function () {
                            popover.update();
                            popover.setContent();
                        })

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