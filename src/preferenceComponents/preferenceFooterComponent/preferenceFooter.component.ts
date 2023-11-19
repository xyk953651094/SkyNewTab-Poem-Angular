import {Component, Input, OnInit} from "@angular/core";
import {getFontColor, btnMouseOver, btnMouseOut} from "../../typescripts/publicFunctions";
import {defaultPreferenceData} from "../../typescripts/publicConstants";

@Component({
    selector: "preferenceFooter-component",
    templateUrl: "./preferenceFooter.component.html",
    styleUrls: ["./preferenceFooter.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class preferenceFooterComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    @Input() preferenceData = defaultPreferenceData;
    title = "preferenceFooterComponent";
    protected readonly getFontColor = getFontColor;

    homeBtnOnClick(value: string) {
        window.open("https://" + value + ".com/xyk953651094/SkyNewTab-Poem-Angular/", "_blank");
    }

    blogBtnOnClick() {
        window.open("https://xyk953651094.blogspot.com/", "_blank");
    }

    ngOnInit(): void {

    }

    protected readonly btnMouseOut = btnMouseOut;
    protected readonly btnMouseOver = btnMouseOver;
}
