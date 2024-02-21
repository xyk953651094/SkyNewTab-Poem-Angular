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

    ngOnInit(): void {}
}
