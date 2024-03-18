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
    protected readonly getFontColor = getFontColor;
    protected readonly btnMouseOut = btnMouseOut;
    protected readonly btnMouseOver = btnMouseOver;

    homeBtnOnClick(value: string) {
        window.open("https://" + value + ".com/xyk953651094/SkyNewTab-Poem-Angular/", "_blank");
    }

    weChatBtnOnClick() {
        window.open("https://github.com/xyk953651094/xyk953651094/assets/28004442/fd605f5c-d2ca-43eb-ae16-86d17d5f6fb1/", "_blank");
    }

    blogBtnOnClick() {
        window.open("https://xyk953651094.blogspot.com/", "_blank");
    }

    supportBtnOnClick() {
        window.open("https://afdian.net/a/xyk953651094/", "_blank");
    }

    ngOnInit(): void {

    }
}
