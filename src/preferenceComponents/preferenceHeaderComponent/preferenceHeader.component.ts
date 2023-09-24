import {Component, Input, OnInit} from "@angular/core";
import {getFontColor} from "../../typescripts/publicFunctions";
import {defaultPreferenceData} from "../../typescripts/publicConstants";

@Component({
    selector: "preferenceHeader-component",
    templateUrl: "./preferenceHeader.component.html",
    styleUrls: ["./preferenceHeader.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class preferenceHeaderComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    @Input() preferenceData = defaultPreferenceData;
    title = "preferenceHeaderComponent";
    protected readonly getFontColor = getFontColor;

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.majorColor;
        e.currentTarget.style.color = getFontColor(this.majorColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = getFontColor(this.minorColor);
    }

    supportBtnOnClick() {
        window.open("https://afdian.net/a/xyk953651094", "_blank");
    }

    ngOnInit(): void {

    }
}
