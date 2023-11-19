import {Component, Input, OnInit} from "@angular/core";
import {getFontColor, btnMouseOver, btnMouseOut} from "../../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../../typescripts/publicInterface";
import {defaultPreferenceData} from "../../typescripts/publicConstants";

@Component({
    selector: "popupFooter-component",
    templateUrl: "./popupFooter.component.html",
    styleUrls: ["./popupFooter.component.scss", "../../app/popupComponent/popup.component.scss"]
})
export class popupFooterComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    @Input() preferenceData: PreferenceDataInterface = defaultPreferenceData;
    title = "popupFooterComponent";
    protected readonly getFontColor = getFontColor;

    homeBtnOnClick(value: string) {
        window.open("https://" + value + ".com/xyk953651094/SkyNewTab-Poem-Angular/", "_blank");
    }

    blogBtnOnClick() {
        window.open("https://xyk953651094.blogspot.com/", "_blank");
    }

    supportBtnOnClick() {
        window.open("https://afdian.net/a/xyk953651094/", "_blank");
    }

    ngOnInit(): void {

    }

    protected readonly btnMouseOut = btnMouseOut;
    protected readonly btnMouseOver = btnMouseOver;
}
