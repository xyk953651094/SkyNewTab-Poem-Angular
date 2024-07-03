import {Component, Input, OnInit} from "@angular/core";
import {btnMouseOut, btnMouseOver, getFontColor} from "../../typescripts/publicFunctions";
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
    currentVersion = require('../../../package.json').version;
    protected readonly getFontColor = getFontColor;
    protected readonly btnMouseOut = btnMouseOut;
    protected readonly btnMouseOver = btnMouseOver;

    homeBtnOnClick(value: string) {
        window.open("https://" + value + ".com/xyk953651094/SkyNewTab-Poem-Angular/", "_blank");
    }

    ngOnInit(): void {

    }
}
