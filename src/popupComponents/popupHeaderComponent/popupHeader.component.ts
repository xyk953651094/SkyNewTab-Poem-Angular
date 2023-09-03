import {Component, Input, OnInit} from "@angular/core";
import {getFontColor} from "../../typescripts/publicFunctions";

@Component({
    selector: "popupHeader-component",
    templateUrl: "./popupHeader.component.html",
    styleUrls: ["./popupHeader.component.scss", "../../app/popupComponent/popup.component.scss"]
})
export class popupHeaderComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    title = "popupHeaderComponent";

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.majorColor;
        e.currentTarget.style.color = getFontColor(this.majorColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = getFontColor(this.minorColor);
    }

    ngOnInit(): void {

    }

    protected readonly getFontColor = getFontColor;
}
