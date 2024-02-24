import {Component, Input, OnInit} from "@angular/core";
import {btnMouseOut, btnMouseOver, getFontColor, getSearchEngineDetail} from "../../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../../typescripts/publicInterface";
import {defaultPreferenceData} from "../../typescripts/publicConstants";

@Component({
    selector: "popupPoem-component",
    templateUrl: "./popupPoem.component.html",
    styleUrls: ["./popupPoem.component.scss", "../../app/popupComponent/popup.component.scss"]
})
export class popupPoemComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    @Input() preferenceData: PreferenceDataInterface = defaultPreferenceData;
    title = "popupPoemComponent";
    searchEngineUrl = "https://www.bing.com/search?q=";
    poemContent = "海上生明月，天涯共此时。"
    poemAuthor = "【唐】张九龄 ·《望月怀远》";
    poemMaxSize = 25;
    customPoem = false;
    autoTopic = false;
    protected readonly getFontColor = getFontColor;
    protected readonly btnMouseOut = btnMouseOut;
    protected readonly btnMouseOver = btnMouseOver;

    poemContentBtnOnClick() {
        window.open(this.searchEngineUrl + this.poemContent, "_blank");
    }

    poemAuthorBtnOnClick() {
        window.open(this.searchEngineUrl + this.poemAuthor, "_blank");
    }

    setPoem() {
        let poemDataStorage = localStorage.getItem("lastPoem");
        if (poemDataStorage) {
            let poemData = JSON.parse(poemDataStorage);
            let tempPoemContent = "";
            let tempPoemAuthor = "";
            if (this.autoTopic) {
                tempPoemContent = poemData.data.content.length < this.poemMaxSize ?
                    poemData.data.content : poemData.data.content.substring(0, this.poemMaxSize) + "...";

                tempPoemAuthor =
                    "【" + poemData.data.origin.dynasty + " · " + poemData.data.origin.author + "】" +
                    "《" + poemData.data.origin.title + "》";
                tempPoemAuthor = tempPoemAuthor.length < this.poemMaxSize ?
                    tempPoemAuthor : tempPoemAuthor.substring(0, this.poemMaxSize) + "...";
            } else {
                tempPoemContent = poemData.content.length < this.poemMaxSize ?
                    poemData.content : poemData.content.substring(0, this.poemMaxSize) + "...";

                tempPoemAuthor = "【" + poemData.author + "】《" + poemData.origin + "》";
                tempPoemAuthor = tempPoemAuthor.length < this.poemMaxSize ?
                    tempPoemAuthor : tempPoemAuthor.substring(0, this.poemMaxSize) + "...";
            }
            this.poemContent = tempPoemContent;
            this.poemAuthor = tempPoemAuthor;
        }
    }

    ngOnInit(): void {
        this.searchEngineUrl = getSearchEngineDetail(this.preferenceData.searchEngine).searchEngineUrl

        let customPoemStorage = localStorage.getItem("customPoem");
        if (customPoemStorage) {
            this.customPoem = JSON.parse(customPoemStorage);
        } else {
            localStorage.setItem("customPoem", JSON.stringify(false));
        }

        if (this.customPoem) {
            let customContentStorage = localStorage.getItem("customContent");
            let customAuthorStorage = localStorage.getItem("customAuthor");
            if (customContentStorage && customAuthorStorage) {
                this.poemContent = customContentStorage.length < this.poemMaxSize ?
                    customContentStorage : customContentStorage.substring(0, this.poemMaxSize) + "...";
                this.poemAuthor = customAuthorStorage.length < this.poemMaxSize ?
                    customAuthorStorage : customAuthorStorage.substring(0, this.poemMaxSize) + "...";
            }
        } else {
            this.setPoem();
        }
    }
}
