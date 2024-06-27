import {Component, Input, OnInit} from "@angular/core";
import {btnMouseOut, btnMouseOver, getFontColor} from "../../typescripts/publicFunctions";
import {defaultPreferenceData} from "../../typescripts/publicConstants";

@Component({
    selector: "menuHeader-component",
    templateUrl: "./menuHeader.component.html",
    styleUrls: ["./menuHeader.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class menuHeaderComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    @Input() preferenceData = defaultPreferenceData;
    title = "menuHeaderComponent";
    protected readonly getFontColor = getFontColor;
    protected readonly btnMouseOut = btnMouseOut;
    protected readonly btnMouseOver = btnMouseOver;

    weChatBtnOnClick() {
        window.open("https://github.com/xyk953651094/xyk953651094/assets/28004442/fd605f5c-d2ca-43eb-ae16-86d17d5f6fb1/", "_self");
    }

    blogBtnOnClick() {
        window.open("https://xyk953651094.blogspot.com/", "_self");
    }

    ngOnInit(): void {}
}
