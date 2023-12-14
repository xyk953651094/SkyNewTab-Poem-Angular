import {Component, Input, OnInit, SimpleChanges} from "@angular/core";
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
    searchEngineName: string = "必应";
    searchEngineValue: string = "bing";
    searchEngineUrl: string = "https://www.bing.com/search?q=";
    buttonShape: NzButtonShape = "round";
    protected readonly getFontColor = getFontColor;

    onPressEnter(e: any) {
        if (e.keyCode === 13) {
            window.open(this.searchEngineUrl + e.target.value)
        }
    }

    changeSearchEngine() {
        const searchEngines = ["bing", "google"];
        let currentIndex = searchEngines.indexOf(this.searchEngineValue);
        let nextIndex = 0;
        if (currentIndex !== searchEngines.length - 1) {
            nextIndex = currentIndex + 1;
        }

        let searchEngineDetail = getSearchEngineDetail(searchEngines[nextIndex])
        this.searchEngineName = searchEngineDetail.searchEngineName;
        this.searchEngineValue = searchEngineDetail.searchEngineValue;
        this.searchEngineUrl = searchEngineDetail.searchEngineUrl;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["preferenceData"]) {
            this.buttonShape = this.preferenceData.buttonShape === "round" ? "circle" : null;

            let searchEngineDetail = getSearchEngineDetail(this.preferenceData.searchEngine);
            this.display = this.preferenceData.simpleMode ? "none" : "block";
            this.searchEngineName = searchEngineDetail.searchEngineName;
            this.searchEngineUrl = searchEngineDetail.searchEngineUrl;
        }
    }

    ngOnInit(): void {

    }
}
