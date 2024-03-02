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

    homeBtnOnClick(value: string) {
        window.open("https://" + value + ".com/xyk953651094/SkyNewTab-Poem-Angular/", "_self");
    }

    updateBtnOnClick(value: string) {
        if (value === "github") {
            window.open("https://" + value + ".com/xyk953651094/SkyNewTab-Poem-Angular/releases/", "_self");
        } else {
            window.open("https://" + value + ".com/xyk953651094/SkyNewTab-Poem-Angular/-/releases/", "_self");
        }
    }

    helpBtnOnClick(source: string) {
        window.open("https://xyk953651094." + source + ".io/SkyDocuments/", "_self");
    }

    ngOnInit(): void {}
}
