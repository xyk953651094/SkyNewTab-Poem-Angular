import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {defaultPreferenceData, device} from "../../typescripts/publicConstants"
import {
    btnMouseOut,
    btnMouseOver,
    getFontColor,
    getGreetContent,
    getGreetIcon,
    getSearchEngineDetail,
    getTimeDetails,
    httpRequest
} from "../../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../../typescripts/publicInterface";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
    selector: "greet-component",
    templateUrl: "./greet.component.html",
    styleUrls: ["./greet.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class GreetComponent implements OnInit, OnChanges {
    @Input() majorColor: string = "#000000";
    @Input() minorColor: string = "#ffffff";
    @Input() preferenceData: PreferenceDataInterface = defaultPreferenceData;
    @Output() getHolidayData: EventEmitter<any> = new EventEmitter();
    title = "GreetComponent";
    display = "block";
    searchEngineUrl: string = "https://www.bing.com/search?q=";
    greetIcon: string = "";
    greetContent: string = "你好";
    holidayContent: string = "暂无信息";
    calendar: string = "暂无信息";
    suit: string = "暂无信息";
    avoid: string = "暂无信息";
    btnMaxSize = 80;
    protected readonly getGreetContent = getGreetContent;
    protected readonly device = device;
    protected readonly getFontColor = getFontColor;
    protected readonly btnMouseOut = btnMouseOut;
    protected readonly btnMouseOver = btnMouseOver;

    constructor(private notification: NzNotificationService) {}

    historyBtnOnClick() {
        window.open(this.searchEngineUrl + "历史上的今天", "_self");
    }

    infoBtnOnClick() {
        window.open(this.searchEngineUrl + "万年历", "_self");
    }

    // 问候
    setGreet(): void {
        this.greetIcon = getGreetIcon();
        this.greetContent = getGreetContent();
    }

    // 请求完成后处理步骤
    setHoliday(data: any): void {
        this.holidayContent = data.solarTerms;
        if (data.solarTerms.indexOf("后") === -1) {
            this.holidayContent = "今日" + this.holidayContent;
        }
        if (data.typeDes !== "休息日" && data.typeDes !== "工作日") {
            this.holidayContent = this.holidayContent + " · " + data.typeDes;

            // 发送恭贺通知
            let displayBlessStorage = localStorage.getItem("displayBless");
            if (displayBlessStorage === null) {
                this.notification.blank(
                    "今日" + data.typeDes,
                    "云开诗词新标签页祝您" + data.typeDes + "快乐！",
                    {nzPlacement: "bottomLeft", nzDuration: 5000, nzCloseIcon: "null"}
                );
                localStorage.setItem("displayBless", JSON.stringify(false));
            }
        } else {
            localStorage.removeItem("displayBless");
        }

        let timeDetails = getTimeDetails(new Date());
        this.calendar = timeDetails.showDate4 + " " + timeDetails.showWeek + " ｜ " + data.yearTips + data.chineseZodiac + "年 ｜ " + data.lunarCalendar + " ｜ " + data.constellation;
        this.suit = data.suit.replace(/\./g, " · ");
        this.avoid = data.avoid.replace(/\./g, " · ");
    }

    // 节气
    getHoliday(): void {
        let tempThis = this;
        let headers = {};
        let url = "https://www.mxnzp.com/api/holiday/single/" + getTimeDetails(new Date()).showDate3;
        let data = {
            "app_id": "cicgheqakgmpjclo",
            "app_secret": "RVlRVjZTYXVqeHB3WCtQUG5lM0h0UT09",
        };
        httpRequest(headers, url, data, "GET")
            .then(function (resultData: any) {
                localStorage.setItem("lastHolidayRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
                if (resultData.code === 1) {
                    localStorage.setItem("lastHoliday", JSON.stringify(resultData.data));      // 保存请求结果，防抖节流
                    tempThis.getHolidayData.emit(resultData.data);                             // 通知父组件更新节假日信息
                    tempThis.setHoliday(resultData.data);
                }
            })
            .catch(function () {
                // 请求失败也更新请求时间，防止超时后无信息可显示
                // localStorage.setItem("lastHolidayRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流

                // 请求失败时使用上一次请求结果
                let lastHoliday: any = localStorage.getItem("lastHoliday");
                if (lastHoliday) {
                    lastHoliday = JSON.parse(lastHoliday);
                    tempThis.setHoliday(lastHoliday);
                }
            });
    };

    ngOnChanges(changes: SimpleChanges) {
        if (changes["preferenceData"]) {
            this.display = this.preferenceData.simpleMode ? "none" : "block";
            this.searchEngineUrl = getSearchEngineDetail(this.preferenceData.searchEngine).searchEngineUrl;
        }
    }

    ngOnInit(): void {
        this.display = this.preferenceData.simpleMode ? "none" : "block";
        this.searchEngineUrl = getSearchEngineDetail(this.preferenceData.searchEngine).searchEngineUrl;

        // 问候
        this.setGreet();

        // 节气，防抖节流
        if (!this.preferenceData.simpleMode) {
            let lastRequestTime: any = localStorage.getItem("lastHolidayRequestTime");
            let nowTimeStamp = new Date().getTime();
            if (lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
                this.getHoliday();
            } else if (nowTimeStamp - parseInt(lastRequestTime) > 4 * 60 * 60 * 1000) {  // 必须多于四小时才能进行新的请求
                this.getHoliday();
            } else {  // 四小时之内使用上一次请求结果
                let lastHoliday: any = localStorage.getItem("lastHoliday");
                if (lastHoliday) {
                    lastHoliday = JSON.parse(lastHoliday);
                    this.setHoliday(lastHoliday);
                }
            }

            setInterval(() => {
                this.greetIcon = getGreetIcon();
                this.greetContent = getGreetContent()
            }, 60 * 60 * 1000);
        }
    }
}
