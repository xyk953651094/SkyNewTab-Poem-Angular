import {Component, Input, OnInit} from "@angular/core";
import {
    btnMouseOut,
    btnMouseOver,
    getFontColor,
    getGreetContent,
    getGreetIcon,
    getSearchEngineDetail,
    getWeatherIcon
} from "../../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../../typescripts/publicInterface";
import {defaultPreferenceData} from "../../typescripts/publicConstants";

@Component({
    selector: "popupStatus-component",
    templateUrl: "./popupStatus.component.html",
    styleUrls: ["./popupStatus.component.scss", "../../app/popupComponent/popup.component.scss"]
})
export class popupStatusComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    @Input() preferenceData: PreferenceDataInterface = defaultPreferenceData;
    title = "popupStatusComponent";
    greetIcon = getGreetIcon();
    greetContent = getGreetContent();
    weatherIcon = "";
    weatherContent = "暂无信息";
    dailySize = 0;
    todoSize = 0;
    focusMode = false;
    searchEngineUrl = "https://www.bing.com/search?q=";
    protected readonly getFontColor = getFontColor;
    protected readonly btnMouseOver = btnMouseOver;
    protected readonly btnMouseOut = btnMouseOut;

    greetBtnOnClick() {
        window.open(this.searchEngineUrl + "万年历", "_blank");
    }

    weatherBtnOnClick() {
        window.open(this.searchEngineUrl + "天气", "_blank",);
    }

    setHoliday(data: any) {
        let holidayContent = data.solarTerms;
        if (data.solarTerms.indexOf("后") === -1) {
            holidayContent = "今日" + holidayContent;
        }
        if (data.typeDes !== "休息日" && data.typeDes !== "工作日") {
            holidayContent = holidayContent + " · " + data.typeDes;
        }
        return holidayContent;
    }

    ngOnInit(): void {
        let tempGreet = localStorage.getItem("lastHoliday");
        let tempWeather = localStorage.getItem("lastWeather");
        let tempDaily = localStorage.getItem("daily");
        let tempTodos = localStorage.getItem("todos");
        let tempFocusMode = localStorage.getItem("focusMode");

        this.greetContent = tempGreet ? getGreetContent() + " ｜ " + this.setHoliday(JSON.parse(tempGreet)) : "暂无信息";
        this.weatherIcon = tempWeather ? getWeatherIcon(JSON.parse(tempWeather).weatherData.weather) : "";
        this.weatherContent = tempWeather ? JSON.parse(tempWeather).weatherData.weather + " ｜ " + JSON.parse(tempWeather).weatherData.temperature + "°C" : "暂无信息";
        this.dailySize = tempDaily ? JSON.parse(tempDaily).length : 0;
        this.todoSize = tempTodos ? JSON.parse(tempTodos).length : 0;
        this.focusMode = tempFocusMode ? JSON.parse(tempFocusMode) : false;
        this.searchEngineUrl = getSearchEngineDetail(this.preferenceData.searchEngine).searchEngineUrl
    }
}
