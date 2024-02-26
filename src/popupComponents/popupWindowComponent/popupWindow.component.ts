import {Component, Input} from "@angular/core";
import {getFontColor, getWindowClassName} from "../../typescripts/publicFunctions";

@Component({
    selector: "popupWindow-component",
    templateUrl: "./popupWindow.component.html",
    styleUrls: ["./popupWindow.component.scss"]
})
export class PopupWindowComponent {
    title = "PopupWindowComponent";
    @Input() majorColor: string = "#000000";
    @Input() minorColor: string = "#ffffff";
    windowClassName: string = getWindowClassName();

    protected readonly getFontColor = getFontColor;
}