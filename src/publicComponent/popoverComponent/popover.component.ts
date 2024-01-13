import {Component, Input} from "@angular/core";
import {getFontColor} from "../../typescripts/publicFunctions";
import {NzButtonShape} from "ng-zorro-antd/button";

const $ = require("jquery");

@Component({
    selector: "popover-component",
    templateUrl: "./popover.component.html",
    styleUrls: ["./popover.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class PopoverComponent {
    @Input() popoverTitle: any;
    @Input() popoverContent: any;
    @Input() popoverPlacement: string = "";
    @Input() popoverMinWidth: string = "";
    @Input() buttonShape: NzButtonShape = "round";
    @Input() display: string = "block";
    @Input() buttonIcon: any;
    @Input() buttonContent: string = "";
    @Input() minorColor: string = "#ffffff";
    title = "PopoverComponent";
    protected readonly getFontColor = getFontColor;
}