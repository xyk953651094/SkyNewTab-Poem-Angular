import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {NzMessageService} from 'ng-zorro-antd/message';
import {
    btnMouseOut,
    btnMouseOver,
    getFontColor,
    getSearchEngineDetail,
    getTimeDetails,
    getWeatherIcon,
    httpRequest
} from "../../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../../typescripts/publicInterface";
import {defaultPreferenceData} from "../../typescripts/publicConstants";

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
    lastRequestTime: string = "暂无信息";
    searchEngineUrl: string = "https://www.bing.com/search?q=";
    weatherIcon: string = "";
    weatherContent: string = "暂无信息";
    weatherTips: string = "";
    location: string = "暂无信息";
    humidity: string = "暂无信息";
    pm25: string = "暂无信息";
    rainfall: string = "暂无信息";
    visibility: string = "暂无信息";
    windInfo: string = "暂无信息";
    protected readonly getFontColor = getFontColor;
    protected readonly getTimeDetails = getTimeDetails;
    protected readonly btnMouseOut = btnMouseOut;
    protected readonly btnMouseOver = btnMouseOver;

    constructor(private message: NzMessageService) {}

    infoBtnOnClick() {
        window.open(this.searchEngineUrl + "天气", "_self");
    }

    // 天气
    setWeather(data: any): void {
        if (data.weatherData) {
            this.weatherIcon = getWeatherIcon(data.weatherData.weather);
            this.weatherContent = data.weatherData.weather + " ｜ " + data.weatherData.temperature + "°C";
            this.location = data.region.replace("|", " · ");
            this.humidity = data.weatherData.humidity;
            this.pm25 = data.weatherData.pm25;
            this.rainfall = data.weatherData.rainfall + "%";
            this.visibility = data.weatherData.visibility;
            this.windInfo = data.weatherData.windDirection + " " + data.weatherData.windPower + " 级";

            if (parseInt(data.weatherData.temperature) > 30) {
                this.weatherTips = "天气炎热，请注意避暑，减少户外活动";
            } else if (parseInt(data.weatherData.temperature) < 0) {
                this.weatherTips = "天气寒冷，请注意防寒，减少户外活动";
            }
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
                // localStorage.setItem("lastWeatherRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流

                // 请求失败时使用上一次请求结果
                let lastWeather: any = localStorage.getItem("lastWeather");
                if (lastWeather) {
                    lastWeather = JSON.parse(lastWeather);
                    tempThis.setWeather(lastWeather);
                }
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
            let tempLastRequestTime: any = localStorage.getItem("lastWeatherRequestTime");
            let nowTimeStamp = new Date().getTime();
            if (tempLastRequestTime === null) {  // 第一次请求时 tempLastRequestTime 为 null，因此直接进行请求赋值 tempLastRequestTime
                this.getWeather();
            } else if (nowTimeStamp - parseInt(tempLastRequestTime) > 60 * 60 * 1000) {  // 必须多于一小时才能进行新的请求
                this.getWeather();
            } else {  // 一小时之内使用上一次请求结果
                let lastWeather: any = localStorage.getItem("lastWeather");
                if (lastWeather) {
                    lastWeather = JSON.parse(lastWeather);
                    this.setWeather(lastWeather);
                }
            }

            if (tempLastRequestTime !== null) {
                this.lastRequestTime = getTimeDetails(new Date(parseInt(tempLastRequestTime))).showDetail;
            }
        }
    }
}
