import {Component, OnInit} from "@angular/core";
import {getFontColor, setColorTheme} from "../../typescripts/publicFunctions";
import {defaultPreferenceData, lightThemeArray} from "../../typescripts/publicConstants";

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
    protected readonly getFontColor = getFontColor;

    ngOnInit(): void {
// 加载偏好设置
        let tempPreferenceData = localStorage.getItem("preferenceData");
        if (tempPreferenceData === null) {
            localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
        }
        this.preferenceData = tempPreferenceData === null ? defaultPreferenceData : JSON.parse(tempPreferenceData);

        // 设置颜色主题
        let themeArray;
        let tempThemeColor = localStorage.getItem("themeArray");
        if (tempThemeColor) {
            themeArray = JSON.parse(tempThemeColor);
            let bodyEle = $("body");
            bodyEle.css("background-color", themeArray.minorColor + " !important");
        }
        else {
            themeArray = setColorTheme();
        }
        this.majorColor = themeArray.majorColor;
        this.minorColor = themeArray.minorColor;
    }
}
