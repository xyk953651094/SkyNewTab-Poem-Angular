import {Component, Input, OnInit} from "@angular/core";
import {getFontColor} from "../../typescripts/publicFunctions";

@Component({
    selector: "preferenceInfo-component",
    templateUrl: "./preferenceInfo.component.html",
    styleUrls: ["./preferenceInfo.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class preferenceInfoComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    title = "preferenceInfoComponent";

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.majorColor;
        e.currentTarget.style.color = getFontColor(this.majorColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = getFontColor(this.minorColor);
    }

    calendarBtnOnClick() {
        window.open("mailto:xyk953651094@qq.com?&subject=云开诗词新标签页-功能建议", "_blank");
    }

    weatherBtnOnClick() {
        window.open("mailto:xyk953651094@qq.com?&subject=云开诗词新标签页-问题反馈", "_blank");
    }

    poemBtnOnClick() {
        window.open("mailto:xyk953651094@qq.com?&subject=云开诗词新标签页-问题反馈", "_blank");
    }

    ngOnInit(): void {

    }

    protected readonly getFontColor = getFontColor;
}
