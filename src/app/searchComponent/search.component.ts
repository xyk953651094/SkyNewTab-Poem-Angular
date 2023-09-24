import {Component, Input, OnInit} from "@angular/core";
import {getFontColor, getSearchEngineDetail} from "../../typescripts/publicFunctions";
import {defaultPreferenceData} from "../../typescripts/publicConstants";
import {NzButtonShape} from "ng-zorro-antd/button";

const $ = require("jquery");

@Component({
    selector: "search-component",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class SearchComponent implements OnInit {
    @Input() minorColor: string = "#000000";
    @Input() preferenceData = defaultPreferenceData;
    title = "SearchComponent";
    display: "block" | "none" = "block";
    searchEngineUrl: string = "https://www.bing.com/search?q=";
    searchEngineIconUrl: string = "https://www.bing.com/favicon.ico";
    buttonShape: NzButtonShape = "round";

    onPressEnter(e: any) {
        if (e.keyCode === 13) {
            window.open(this.searchEngineUrl + e.target.value)
        }
    }

    ngOnInit(): void {
        this.display = this.preferenceData.simpleMode ? "none" : "block";
        this.searchEngineUrl = getSearchEngineDetail(this.preferenceData.searchEngine).searchEngineUrl;
        this.searchEngineIconUrl = getSearchEngineDetail(this.preferenceData.searchEngine).searchEngineIconUrl;
        this.buttonShape = this.preferenceData.buttonShape === "round" ? "circle" : null;
    }

    protected readonly getFontColor = getFontColor;
}
