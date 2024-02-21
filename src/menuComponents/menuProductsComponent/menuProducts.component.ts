import {Component, Input, OnInit} from "@angular/core";
import {btnMouseOut, btnMouseOver, getFontColor} from "../../typescripts/publicFunctions";
import {defaultPreferenceData} from "../../typescripts/publicConstants";
import {NzButtonShape} from "ng-zorro-antd/button";

@Component({
    selector: "menuProducts-component",
    templateUrl: "./menuProducts.component.html",
    styleUrls: ["./menuProducts.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class menuProductsComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    @Input() preferenceData = defaultPreferenceData;
    title = "menuProductsComponent";
    protected readonly getFontColor = getFontColor;
    protected readonly btnMouseOut = btnMouseOut;
    protected readonly btnMouseOver = btnMouseOver;

    homeBtnOnClick(value: string) {
        window.open("https://" + value + ".com/xyk953651094/", "_self");
    }

    ngOnInit(): void {}
}
