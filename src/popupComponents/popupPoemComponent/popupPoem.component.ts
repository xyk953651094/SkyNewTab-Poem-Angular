import {Component, Input, OnInit} from "@angular/core";
import {getFontColor, getSearchEngineDetail} from "../../typescripts/publicFunctions";
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
    poemAuthor = "张九龄";
    poemAuthorDetails = "【唐】张九龄 ·《望月怀远》";
    poemMaxSize = 25;

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.majorColor;
        e.currentTarget.style.color = getFontColor(this.majorColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = getFontColor(this.minorColor);
    }

    poemContentBtnOnClick() {
        window.open(this.searchEngineUrl + this.poemContent, "_blank");
    }

    poemAuthorBtnOnClick() {
        window.open(this.searchEngineUrl + this.poemAuthor, "_blank");
    }

    setPoem(poemData: any) {
        this.poemContent = poemData.data.content;
        this.poemAuthor = poemData.data.origin.author;
        this.poemAuthorDetails = "【" + poemData.data.origin.dynasty + "】" +
            poemData.data.origin.author + " ·" +
            "《" + poemData.data.origin.title + "》";
    }

    getPoem() {
        let poemData = localStorage.getItem("lastPoem");
        if(poemData){
            this.setPoem(JSON.parse(poemData));
        }
    }

    ngOnInit(): void {
        this.getPoem();
        this.searchEngineUrl = getSearchEngineDetail(this.preferenceData.searchEngine).searchEngineUrl
    }

    protected readonly getFontColor = getFontColor;
}
