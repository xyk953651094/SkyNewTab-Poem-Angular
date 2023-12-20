import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from "@angular/core";
import {getFontColor, getSearchEngineDetail} from "../../typescripts/publicFunctions";
import {defaultPreferenceData, device} from "../../typescripts/publicConstants";
import {
    preferenceFooterComponent
} from "../../preferenceComponents/preferenceFooterComponent/preferenceFooter.component";
import {PreferenceDataInterface} from "../../typescripts/publicInterface";
import {NzDrawerPlacement} from "ng-zorro-antd/drawer";
import {NzButtonShape} from "ng-zorro-antd/button";

const poemRequest = require("jinrishici");

@Component({
    selector: "preference-component",
    templateUrl: "./preference.component.html",
    styleUrls: ["./preference.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class PreferenceComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    @Input() preferenceData = defaultPreferenceData;
    @Output() getPreferenceData: EventEmitter<PreferenceDataInterface> = new EventEmitter();
    title = "PreferenceComponent";
    displayDrawer = false;
    drawerPosition: NzDrawerPlacement = "right";
    buttonShape: NzButtonShape = "round";
    protected readonly getFontColor = getFontColor;
    protected readonly preferenceFooterComponent = preferenceFooterComponent;

    showDrawerBtnOnClick() {
        this.displayDrawer = true;
    }

    drawerOnClose() {
        this.displayDrawer = false;
    }

    getPreferenceFunctionData(value: PreferenceDataInterface) {
        this.getPreferenceData.emit(value);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["preferenceData"]) {
            this.buttonShape = this.preferenceData.buttonShape === "round" ? "circle" : null;
        }
    }

    ngOnInit(): void {
        // 屏幕适配
        if (device === "iPhone" || device === "Android") {
            this.drawerPosition = "bottom";
        }
    }
}
