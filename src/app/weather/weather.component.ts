import {Component, OnInit, Input} from '@angular/core';
import {getTimeDetails, getWeatherIcon, httpRequest} from "../../public/publicFunctions";
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
    location: string = '暂无信息';
    humidity: string = '暂无信息';
    pm25: string = '暂无信息';
    rainfall: string = '暂无信息';
    visibility: string = '暂无信息';
    windInfo: string = '暂无信息';
    

    // 天气
    setWeather(data: any): void {
        if (data.weatherData) {
            this.weatherIcon = getWeatherIcon(data.weatherData.weather);
            this.weatherContent = data.weatherData.weather + '｜' + data.weatherData.temperature + '°C';
            this.location = data.region.replace("|", " · ");
            this.humidity = data.weatherData.humidity;
            this.pm25 = data.weatherData.pm25;
            this.rainfall = data.weatherData.rainfall + "%";
            this.visibility = data.weatherData.visibility;
            this.windInfo = data.weatherData.windDirection + data.weatherData.windPower + "级";

            // 更新 popover
            let contentHtml =
                "<div>" +
                "<p><i class=\"bi bi-moisture\"></i> 空气湿度：" + this.humidity + "</p>" +
                "<p><i class=\"bi bi-water\"></i> 空气质量：" + this.pm25 + "</p>" +
                "<p><i class=\"bi bi-cloud-rain\"></i> 降雨概率：" + this.rainfall + "</p>" +
                "<p><i class=\"bi bi-eye\"></i> 视线距离：" + this.visibility + "</p>" +
                "<p><i class=\"bi bi-wind\"></i> 风速情况：" + this.windInfo + "</p>" +
                "</div>";

            let weatherP = $('#weatherP');
            let popover = new bootstrap.Popover(weatherP, {
                html: true,
                title: this.location,
                content: contentHtml,
                offset: "20, 10"
            })

            weatherP.on('shown.bs.popover', function () {
                popover.update();
                popover.setContent();
            })

        }
    }

    getWeather(): void {
        let tempThis = this;
        let url = "https://v2.jinrishici.com/info";
        let data = {};
        httpRequest(url, data, "GET")
            .then(function(resultData: any){
                localStorage.setItem("lastWeatherRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
                if (resultData.status === "success" && resultData.data.weatherData !== null) {
                    localStorage.setItem("lastWeather", JSON.stringify(resultData.data));      // 保存请求结果，防抖节流
                    tempThis.setWeather(resultData.data);
                }
            })
            .catch(function(){
                // 请求失败也更新请求时间，防止超时后无信息可显示
                localStorage.setItem("lastWeatherRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
            });
    }

    ngOnInit(): void {
        // 天气,防抖节流
        let lastRequestTime: any = localStorage.getItem("lastWeatherRequestTime");
        let nowTimeStamp = new Date().getTime();
        if(lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
            this.getWeather();
        }
        else if(nowTimeStamp - parseInt(lastRequestTime) > 60 * 60 * 1000) {  // 必须多于一小时才能进行新的请求
            this.getWeather();
        }
        else {  // 一小时之内使用上一次请求结果
            let lastWeather: any = localStorage.getItem("lastWeather");
            if (lastWeather) {
                lastWeather = JSON.parse(lastWeather);
                this.setWeather(lastWeather);
            }
        }
    }
}