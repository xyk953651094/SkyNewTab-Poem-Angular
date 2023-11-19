import {Component, Input, OnInit} from "@angular/core";
import {getFontColor, btnMouseOver, btnMouseOut} from "../../typescripts/publicFunctions";
import {defaultPreferenceData} from "../../typescripts/publicConstants";

@Component({
    selector: "preferenceToTop-component",
    templateUrl: "./preferenceToTop.component.html",
    styleUrls: ["./preferenceToTop.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class preferenceToTopComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    @Input() preferenceData = defaultPreferenceData;
    title = "preferenceToTopComponent";
    protected readonly getFontColor = getFontColor;

    toTopBtnOnClick(value: string) {
        let drawerContent: HTMLElement | null = document.getElementById("drawerContent");
        if (drawerContent) {
            drawerContent.scrollIntoView({behavior: "smooth"});
        }
    }

    ngOnInit(): void {

    }

    protected readonly btnMouseOut = btnMouseOut;
    protected readonly btnMouseOver = btnMouseOver;
}
