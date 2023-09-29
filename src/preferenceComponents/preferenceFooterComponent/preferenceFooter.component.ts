import {Component, Input, OnInit} from "@angular/core";
import {getFontColor} from "../../typescripts/publicFunctions";
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

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.majorColor;
        e.currentTarget.style.color = getFontColor(this.majorColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = getFontColor(this.minorColor);
    }

    homeBtnOnClick(value: string) {
        window.open("https://" + value + ".com/xyk953651094", "_blank");
    }

    blogBtnOnClick() {
        window.open("https://xyk953651094.blogspot.com", "_blank");
    }

    supportBtnOnClick() {
        window.open("https://afdian.net/a/xyk953651094", "_blank");
    }

    ngOnInit(): void {

    }
}
