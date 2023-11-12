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
    searchEngineName: string = "Bing";
    searchEngineUrl: string = "https://www.bing.com/search?q=";
    buttonShape: NzButtonShape = "round";

    onPressEnter(e: any) {
        if (e.keyCode === 13) {
            window.open(this.searchEngineUrl + e.target.value)
        }
    }

    changeSearchEngine() {
        const searchEngines = ["Baidu", "Bing", "Google", "Yandex"];
        let currentIndex = searchEngines.indexOf(this.searchEngineName);
        let nextIndex = 0;
        if (currentIndex !== searchEngines.length - 1) {
            nextIndex = currentIndex + 1;
        }

        this.searchEngineName = searchEngines[nextIndex];
        this.searchEngineUrl = getSearchEngineDetail(searchEngines[nextIndex].toLowerCase()).searchEngineUrl;
    }

    ngOnInit(): void {
        let searchEngineDetail = getSearchEngineDetail(this.preferenceData.searchEngine);
        this.display = this.preferenceData.simpleMode ? "none" : "block";
        this.searchEngineName = searchEngineDetail.searchEngineName;
        this.searchEngineUrl = searchEngineDetail.searchEngineUrl;
    }

    protected readonly getFontColor = getFontColor;
}
