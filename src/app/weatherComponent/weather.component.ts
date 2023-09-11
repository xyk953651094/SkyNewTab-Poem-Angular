import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {NzMessageService} from 'ng-zorro-antd/message';
import {getFontColor, getSearchEngineDetail, getWeatherIcon, httpRequest} from "../../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../../typescripts/publicInterface";
import {defaultPreferenceData} from "../../typescripts/publicConstants";

const $ = require("jquery");

@Component({
    selector: "weather-component",
    templateUrl: "./weather.component.html",
    styleUrls: ["./weather.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class WeatherComponent implements OnInit, OnChanges {
    @Input() majorColor: string = "#000000";
    @Input() minorColor: string = "#ffffff";
    @Input() preferenceData: PreferenceDataInterface = defaultPreferenceData;
    title = "WeatherComponent";
    display = "block";
    searchEngineUrl: string = "https://www.bing.com/search?q=";
    weatherIcon: string = "";
    weatherContent: string = "";
    location: string = "暂无信息";
    humidity: string = "暂无信息";
    pm25: string = "暂无信息";
    rainfall: string = "暂无信息";
    visibility: string = "暂无信息";
    windInfo: string = "暂无信息";
    protected readonly getFontColor = getFontColor;

    constructor(private message: NzMessageService) {
    }

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.majorColor;
        e.currentTarget.style.color = getFontColor(this.majorColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = getFontColor(this.minorColor);
    }

    locationBtnOnClick() {
        if (this.location !== "暂无信息") {
            window.open(this.searchEngineUrl + this.location, "_blank");
        } else {
            this.message.error("无跳转链接");
        }
    }

    infoBtnOnClick() {
        window.open(this.searchEngineUrl + "天气", "_blank");
    }

    // 天气
    setWeather(data: any): void {
        if (data.weatherData) {
            this.weatherIcon = getWeatherIcon(data.weatherData.weather);
            this.weatherContent = data.weatherData.weather + "｜" + data.weatherData.temperature + "°C";
            this.location = data.region.replace("|", " · ");
            this.humidity = data.weatherData.humidity;
            this.pm25 = data.weatherData.pm25;
            this.rainfall = data.weatherData.rainfall + "%";
            this.visibility = data.weatherData.visibility;
            this.windInfo = data.weatherData.windDirection + " " + data.weatherData.windPower + " 级";
        }
    }

    getWeather(): void {
        let tempThis = this;
        let headers = {}
        let url = "https://v2.jinrishici.com/info";
        let data = {};
        httpRequest(headers, url, data, "GET")
            .then(function (resultData: any) {
                localStorage.setItem("lastWeatherRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
                if (resultData.status === "success" && resultData.data.weatherData !== null) {
                    localStorage.setItem("lastWeather", JSON.stringify(resultData.data));        // 保存请求结果，防抖节流
                    tempThis.setWeather(resultData.data);
                }
            })
            .catch(function () {
                // 请求失败也更新请求时间，防止超时后无信息可显示
                localStorage.setItem("lastWeatherRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
            });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["preferenceData"]) {
            this.display = this.preferenceData.simpleMode ? "none" : "block";
            this.searchEngineUrl = getSearchEngineDetail(this.preferenceData.searchEngine).searchEngineUrl;
        }
    }

    ngOnInit(): void {
        this.display = this.preferenceData.simpleMode ? "none" : "block";
        this.searchEngineUrl = getSearchEngineDetail(this.preferenceData.searchEngine).searchEngineUrl;

        // 天气,防抖节流
        if (!this.preferenceData.simpleMode) {
            let lastRequestTime: any = localStorage.getItem("lastWeatherRequestTime");
            let nowTimeStamp = new Date().getTime();
            if (lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
                this.getWeather();
            } else if (nowTimeStamp - parseInt(lastRequestTime) > 60 * 60 * 1000) {  // 必须多于一小时才能进行新的请求
                this.getWeather();
            } else {  // 一小时之内使用上一次请求结果
                let lastWeather: any = localStorage.getItem("lastWeather");
                if (lastWeather) {
                    lastWeather = JSON.parse(lastWeather);
                    this.setWeather(lastWeather);
                }
            }
        }
    }
}
