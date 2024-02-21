import {Component, Input, OnInit} from "@angular/core";
import {btnMouseOut, btnMouseOver, getFontColor} from "../../typescripts/publicFunctions";
import {defaultPreferenceData} from "../../typescripts/publicConstants";

@Component({
    selector: "menuInfo-component",
    templateUrl: "./menuInfo.component.html",
    styleUrls: ["./menuInfo.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class menuInfoComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    @Input() preferenceData = defaultPreferenceData;
    title = "menuInfoComponent";
    protected readonly getFontColor = getFontColor;
    protected readonly btnMouseOut = btnMouseOut;
    protected readonly btnMouseOver = btnMouseOver;

    calendarBtnOnClick() {
        window.open("https://www.mxnzp.com/", "_self");
    }

    weatherBtnOnClick() {
        window.open("https://www.jinrishici.com/", "_self");
    }

    poemBtnOnClick() {
        window.open("https://www.jinrishici.com/", "_self");
    }

    soundBtnOnClick() {
        window.open("https://www.soundvery.com/", "_self");
    }

    codeBtnOnClick() {
        window.open("https://www.jetbrains.com.cn/community/opensource/#support/", "_self");
    }

    ngOnInit(): void {

    }
}
