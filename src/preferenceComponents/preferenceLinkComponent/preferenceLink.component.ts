import {Component, Input, OnInit} from "@angular/core";
import {getFontColor} from "../../typescripts/publicFunctions";

@Component({
    selector: "preferenceLink-component",
    templateUrl: "./preferenceLink.component.html",
    styleUrls: ["./preferenceLink.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class preferenceLinkComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    title = "preferenceLinkComponent";

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.majorColor;
        e.currentTarget.style.color = getFontColor(this.majorColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = getFontColor(this.minorColor);
    }

    baiduBtnOnClick() {
        window.open("https://hanyu.baidu.com/", "_blank");
    }

    sougouBtnOnClick() {
        window.open("https://hanyu.sogou.com/", "_blank");
    }

    soBtnOnClick() {
        window.open("https://guoxue.baike.so.com/query/index?type=poem&page=1", "_blank");
    }

    jetBrainsBtnOnClick() {
        window.open("https://www.jetbrains.com/", "_blank");
    }

    ngOnInit(): void {

    }

    protected readonly getFontColor = getFontColor;
}
