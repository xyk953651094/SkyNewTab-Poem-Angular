import {Component, EventEmitter, Input, Output} from "@angular/core";
import {btnMouseOut, btnMouseOver, getFontColor} from "../../typescripts/publicFunctions";
import {NzButtonShape} from "ng-zorro-antd/button";

@Component({
    selector: "button-component",
    templateUrl: "./button.component.html",
    styleUrls: ["./button.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class ButtonComponent {
    @Input() buttonContent: string = "";
    @Input() buttonCursor: string = "pointer";
    @Input() buttonIcon: any;
    @Output() buttonOnClick = new EventEmitter();
    @Input() buttonShape: NzButtonShape = "round";
    @Input() majorColor: string = "#000000";
    @Input() minorColor: string = "#ffffff";
    title = "ButtonComponent";
    protected readonly getFontColor = getFontColor;
    protected readonly btnMouseOver = btnMouseOver;
    protected readonly btnMouseOut = btnMouseOut;
}