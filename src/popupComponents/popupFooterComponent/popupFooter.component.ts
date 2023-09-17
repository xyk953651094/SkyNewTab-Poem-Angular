import {Component, Input, OnInit} from "@angular/core";
import {getFontColor} from "../../typescripts/publicFunctions";

@Component({
    selector: "popupFooter-component",
    templateUrl: "./popupFooter.component.html",
    styleUrls: ["./popupFooter.component.scss", "../../app/popupComponent/popup.component.scss"]
})
export class popupFooterComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    title = "popupFooterComponent";
    protected readonly getFontColor = getFontColor;

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.majorColor;
        e.currentTarget.style.color = getFontColor(this.majorColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = getFontColor(this.minorColor);
    }

    homeBtnOnClick() {
        window.open("https://github.com/xyk953651094", "_blank");
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
