import {Component, Input, OnInit} from "@angular/core";
import {getFontColor} from "../../typescripts/publicFunctions";
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

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.majorColor;
        e.currentTarget.style.color = getFontColor(this.majorColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = getFontColor(this.minorColor);
    }

    homeBtnOnClick(terrace: string, frame: string) {
        window.open("https://" + terrace + ".com/xyk953651094/SkyNewTab-" + frame, "_blank");
    }

    ngOnInit(): void {
        this.buttonShape = this.preferenceData.buttonShape === "round" ? "circle" : null;
    }
}
