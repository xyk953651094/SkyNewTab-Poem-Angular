import {Component, Input, OnInit} from "@angular/core";
import {getFontColor} from "../../typescripts/publicFunctions";
import {defaultPreferenceData, device} from "../../typescripts/publicConstants";
import {
    preferenceFooterComponent
} from "../../preferenceComponents/preferenceFooterComponent/preferenceFooter.component";
import {PreferenceDataInterface} from "../../typescripts/publicInterface";

const poemRequest = require("jinrishici");

@Component({
    selector: "preference-component",
    templateUrl: "./preference.component.html",
    styleUrls: ["./preference.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class PreferenceComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    @Input() getPreferenceData: any;
    title = "PreferenceComponent";
    displayDrawer = false;
    drawerPosition = "right";

    showDrawerBtnOnClick() {
        this.displayDrawer = true;
    }

    drawerOnClose() {
        this.displayDrawer = false;
    }

    ngOnInit(): void {
        // 屏幕适配
        if (device === "iPhone" || device === "Android") {
            this.drawerPosition = "bottom";
        }
    }

    protected readonly getFontColor = getFontColor;
    protected readonly preferenceFooterComponent = preferenceFooterComponent;
}
