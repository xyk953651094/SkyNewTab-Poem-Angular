import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from "@angular/core";
import {getFontColor, getSearchEngineDetail} from "../../typescripts/publicFunctions";
import {defaultPreferenceData, device} from "../../typescripts/publicConstants";
import {
    menuFooterComponent
} from "../../menuComponents/menuFooterComponent/menuFooter.component";
import {PreferenceDataInterface} from "../../typescripts/publicInterface";
import {NzDrawerPlacement} from "ng-zorro-antd/drawer";
import {NzButtonShape} from "ng-zorro-antd/button";

const poemRequest = require("jinrishici");

@Component({
    selector: "menu-component",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class MenuComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    @Input() svgColors: string[] = ["#000000", "#000000", "#000000"];
    @Input() preferenceData = defaultPreferenceData;
    @Output() getPreferenceData: EventEmitter<PreferenceDataInterface> = new EventEmitter();
    title = "MenuComponent";
    displayDrawer = false;
    drawerPosition: NzDrawerPlacement = "right";
    buttonShape: NzButtonShape = "round";
    protected readonly getFontColor = getFontColor;
    protected readonly preferenceFooterComponent = menuFooterComponent;

    showDrawerBtnOnClick() {
        this.displayDrawer = true;
    }

    drawerOnClose() {
        this.displayDrawer = false;
    }

    getMenuPreferenceData(value: PreferenceDataInterface) {
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
