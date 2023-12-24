import {Component, Input, OnInit, SimpleChanges} from "@angular/core";
import {getFontColor, getSearchEngineDetail} from "../../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../../typescripts/publicInterface";
import {defaultPreferenceData} from "../../typescripts/publicConstants";

const $ = require("jquery");

@Component({
    selector: "clock-component",
    templateUrl: "./clock.component.html",
    styleUrls: ["./clock.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class ClockComponent implements OnInit {
    @Input() minorColor: string = "#000000";
    @Input() holidayData: any;
    @Input() preferenceData: PreferenceDataInterface = defaultPreferenceData;
    title = "ClockComponent";
    display = "flex";
    currentTime: string = this.getLocaleTime();
    currentDate: string = "暂无信息";
    currentYear: string = "暂无信息";
    protected readonly getFontColor = getFontColor;

    btnMouseOver(e: any) {
        $(".clockText, .dateText").removeClass("textShadow").css("color", getFontColor(this.minorColor));
        e.currentTarget.style.backgroundColor = this.minorColor;
        e.currentTarget.classList.add("componentTheme");
    }

    btnMouseOut(e: any) {
        $(".clockText, .dateText").addClass("textShadow").css("color", this.minorColor);
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.classList.remove("componentTheme");
    }

    getLocaleTime() {
        let currentTime = new Date().getHours();
        let localeTime = "";
        switch (currentTime) {
            case 0:
                localeTime = "子正时";
                break;
            case 1:
                localeTime = "丑初时";
                break;
            case 2:
                localeTime = "丑正时";
                break;
            case 3:
                localeTime = "寅初时";
                break;
            case 4:
                localeTime = "寅正时";
                break;
            case 5:
                localeTime = "卯初时";
                break;
            case 6:
                localeTime = "卯正时";
                break;
            case 7:
                localeTime = "辰初时";
                break;
            case 8:
                localeTime = "辰正时";
                break;
            case 9:
                localeTime = "巳初时";
                break;
            case 10:
                localeTime = "巳正时";
                break;
            case 11:
                localeTime = "午初时";
                break;
            case 12:
                localeTime = "午正时";
                break;
            case 13:
                localeTime = "未初时";
                break;
            case 14:
                localeTime = "未正时";
                break;
            case 15:
                localeTime = "申初时";
                break;
            case 16:
                localeTime = "申正时";
                break;
            case 17:
                localeTime = "酉初时";
                break;
            case 18:
                localeTime = "酉正时";
                break;
            case 19:
                localeTime = "戌初时";
                break;
            case 20:
                localeTime = "戌正时";
                break;
            case 21:
                localeTime = "亥初时";
                break;
            case 22:
                localeTime = "亥正时";
                break;
            case 23:
                localeTime = "子初时";
                break;
        }
        return localeTime;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["holidayData"] && changes["holidayData"].currentValue !== null) {
            this.currentDate = this.holidayData.lunarCalendar;
            this.currentYear = this.holidayData.yearTips + this.holidayData.chineseZodiac + "年";
        }

        if (changes["preferenceData"]) {
            this.display = this.preferenceData.simpleMode ? "none" : "flex";
        }
    }

    ngOnInit(): void {
        this.display = this.preferenceData.simpleMode ? "none" : "block";

        // 每分钟刷新一次（日期与年份取的是万年历中请求的缓存数据，存在请求间隔，因此无法及时更新，只能更新时间）
        setInterval(() => {
            this.currentTime = this.getLocaleTime();
        }, 60 * 1000);
    }
}
