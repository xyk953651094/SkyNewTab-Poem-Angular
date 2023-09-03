import {Component, Input, OnInit} from "@angular/core";
import {getFontColor} from "../../typescripts/publicFunctions";
import {defaultPreferenceData, themeArray} from "../../typescripts/publicConstants";

const $ = require("jquery")

@Component({
    selector: "popup-component",
    templateUrl: "./popup.component.html",
    styleUrls: ["./popup.component.scss"]
})
export class popupComponent implements OnInit {
    title = "popupComponent";
    majorColor = "#000000";
    minorColor = "#ffffff";
    preferenceData = defaultPreferenceData;

    ngOnInit(): void {
// 加载偏好设置
        let tempPreferenceData = localStorage.getItem("preferenceData");
        if (tempPreferenceData === null) {
            localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
        }
        this.preferenceData = tempPreferenceData === null ? defaultPreferenceData : JSON.parse(tempPreferenceData);

        // 设置颜色主题
        let bodyEle = $("body");
        let randomNum = Math.floor(Math.random() * themeArray.length);  // 随机选择
        let themeColor = themeArray[randomNum];
        let tempThemeColor = localStorage.getItem("themeColor");
        if (tempThemeColor) {
            themeColor = JSON.parse(tempThemeColor);
        }
        bodyEle.css("backgroundColor", themeColor.minorColor + " !important");
        this.majorColor = themeColor.majorColor;
        this.minorColor = themeColor.minorColor;
    }

    protected readonly getFontColor = getFontColor;
}
