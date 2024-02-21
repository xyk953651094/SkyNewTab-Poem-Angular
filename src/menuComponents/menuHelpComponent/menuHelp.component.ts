import {Component, Input, OnInit} from "@angular/core";
import {btnMouseOut, btnMouseOver, getFontColor} from "../../typescripts/publicFunctions";
import {defaultPreferenceData} from "../../typescripts/publicConstants";

@Component({
    selector: "menuHelp-component",
    templateUrl: "./menuHelp.component.html",
    styleUrls: ["./menuHelp.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class menuHelpComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    @Input() preferenceData = defaultPreferenceData;
    title = "menuHelpComponent";
    protected readonly getFontColor = getFontColor;
    protected readonly btnMouseOver = btnMouseOver;
    protected readonly btnMouseOut = btnMouseOut;

    helpBtnOnClick(source: string) {
        window.open("https://xyk953651094." + source + ".io/SkyDocuments/", "_self");
    }

    ngOnInit(): void {

    }
}
