import {Component, Input} from "@angular/core";
import {getFontColor, getObjectClassName} from "../../typescripts/publicFunctions";

@Component({
    selector: "popupObject-component",
    templateUrl: "./popupObject.component.html",
    styleUrls: ["./popupObject.component.scss"]
})
export class popupObjectComponent {
    title = "popupObjectComponent";
    @Input() minorColor: string = "#ffffff";
    objectClassName: string = getObjectClassName();

    protected readonly getFontColor = getFontColor;
}