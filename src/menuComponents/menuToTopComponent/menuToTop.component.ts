import {Component, Input, OnInit} from "@angular/core";
import {btnMouseOut, btnMouseOver, getFontColor} from "../../typescripts/publicFunctions";
import {defaultPreferenceData} from "../../typescripts/publicConstants";

@Component({
    selector: "menuToTop-component",
    templateUrl: "./menuToTop.component.html",
    styleUrls: ["./menuToTop.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class menuToTopComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    @Input() preferenceData = defaultPreferenceData;
    title = "menuToTopComponent";
    protected readonly getFontColor = getFontColor;
    protected readonly btnMouseOut = btnMouseOut;
    protected readonly btnMouseOver = btnMouseOver;

    toTopBtnOnClick(value: string) {
        let drawerContent: HTMLElement | null = document.getElementById("drawerContent");
        if (drawerContent) {
            drawerContent.scrollIntoView({behavior: "smooth"});
        }
    }

    ngOnInit(): void {

    }
}
