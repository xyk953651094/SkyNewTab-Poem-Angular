import {Component, Input} from "@angular/core";
import {getWindowClassName} from "../../typescripts/publicFunctions";

@Component({
    selector: "window-component",
    templateUrl: "./window.component.html",
    styleUrls: ["./window.component.scss"]
})
export class WindowComponent {
    title = "WindowComponent";
    @Input() fontColor: string = "#ffffff";
    windowClassName: string = getWindowClassName();
}