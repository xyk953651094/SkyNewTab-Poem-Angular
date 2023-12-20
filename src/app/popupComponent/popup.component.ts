import {Component, OnInit} from "@angular/core";
import {getFontColor, getPreferenceDataStorage, setColorTheme} from "../../typescripts/publicFunctions";

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
    preferenceData = getPreferenceDataStorage();
    protected readonly getFontColor = getFontColor;

    ngOnInit(): void {
        // 设置颜色主题
        let themeArray;
        let tempThemeColor = localStorage.getItem("themeArray");
        if (tempThemeColor) {
            themeArray = JSON.parse(tempThemeColor);
            let bodyEle = $("body");
            bodyEle.css("background-color", themeArray.minorColor + " !important");
        } else {
            themeArray = setColorTheme();
        }
        this.majorColor = themeArray.majorColor;
        this.minorColor = themeArray.minorColor;
    }
}
