import {Component, OnInit} from "@angular/core";
import {getFontColor, getPreferenceDataStorage, setFont, setTheme} from "../../typescripts/publicFunctions";

import $ from "jquery";

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
        let tempTheme;
        let tempThemeStorage = localStorage.getItem("theme");
        if (tempThemeStorage) {
            tempTheme = JSON.parse(tempThemeStorage);
            let bodyEle = $("body");
            bodyEle.css("backgroundColor", tempTheme.majorColor + " !important");
        } else {
            tempTheme = setTheme();
        }
        this.majorColor = tempTheme.majorColor;
        this.minorColor = tempTheme.minorColor;

        // 设置字体(需要优化)
        setFont(".popupFont", this.preferenceData);
    }
}
