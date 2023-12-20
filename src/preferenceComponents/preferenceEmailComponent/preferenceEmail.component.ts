import {Component, Input, OnInit} from "@angular/core";
import {btnMouseOut, btnMouseOver, getFontColor} from "../../typescripts/publicFunctions";
import {defaultPreferenceData} from "../../typescripts/publicConstants";

@Component({
    selector: "preferenceEmail-component",
    templateUrl: "./preferenceEmail.component.html",
    styleUrls: ["./preferenceEmail.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class preferenceEmailComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    @Input() preferenceData = defaultPreferenceData;
    title = "preferenceEmailComponent";
    protected readonly getFontColor = getFontColor;
    protected readonly btnMouseOver = btnMouseOver;
    protected readonly btnMouseOut = btnMouseOut;

    suggestBtnOnClick() {
        window.open("mailto:xyk953651094@qq.com?&subject=云开诗词新标签页-功能建议", "_blank");
    }

    issueBtnOnClick() {
        window.open("mailto:xyk953651094@qq.com?&subject=云开诗词新标签页-问题反馈", "_blank");
    }

    helpBtnOnClick(source: string) {
        window.open("https://xyk953651094." + source + ".io/SkyDocuments/", "_blank");
    }

    ngOnInit(): void {

    }
}
