import {Component, Input, OnInit} from "@angular/core";
import {btnMouseOut, btnMouseOver, getFontColor} from "../../typescripts/publicFunctions";
import {defaultPreferenceData} from "../../typescripts/publicConstants";

@Component({
    selector: "menuHeader-component",
    templateUrl: "./menuHeader.component.html",
    styleUrls: ["./menuHeader.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class menuHeaderComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    @Input() preferenceData = defaultPreferenceData;
    title = "menuHeaderComponent";
    currentVersion = require('../../../package.json').version;
    protected readonly getFontColor = getFontColor;
    protected readonly btnMouseOut = btnMouseOut;
    protected readonly btnMouseOver = btnMouseOver;

    ngOnInit(): void {}
}
