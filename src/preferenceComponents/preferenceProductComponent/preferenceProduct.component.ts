import {Component, Input, OnInit} from "@angular/core";
import {btnMouseOut, btnMouseOver, getFontColor} from "../../typescripts/publicFunctions";
import {defaultPreferenceData} from "../../typescripts/publicConstants";
import {NzButtonShape} from "ng-zorro-antd/button";

@Component({
    selector: "preferenceProduct-component",
    templateUrl: "./preferenceProduct.component.html",
    styleUrls: ["./preferenceProduct.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class preferenceProductComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    @Input() preferenceData = defaultPreferenceData;
    title = "preferenceProductComponent";
    buttonShape: NzButtonShape = "round";
    protected readonly getFontColor = getFontColor;
    protected readonly btnMouseOut = btnMouseOut;
    protected readonly btnMouseOver = btnMouseOver;

    homeBtnOnClick(terrace: string, frame: string) {
        window.open("https://" + terrace + ".com/xyk953651094/" + frame + "/", "_self");
    }

    ngOnInit(): void {
        this.buttonShape = this.preferenceData.buttonShape === "round" ? "circle" : null;
    }
}
