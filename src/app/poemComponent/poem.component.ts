import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {NzMessageService} from 'ng-zorro-antd/message';
import {
    btnMouseOut,
    btnMouseOver,
    getFontColor,
    getSearchEngineDetail,
    httpRequest
} from "../../typescripts/publicFunctions";
import {defaultPreferenceData} from "../../typescripts/publicConstants";

const poemRequest = require("jinrishici");

@Component({
    selector: "poem-component",
    templateUrl: "./poem.component.html",
    styleUrls: ["./poem.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class PoemComponent implements OnInit, OnChanges {
    @Input() majorColor: string = "#000000";
    @Input() minorColor: string = "#ffffff";
    @Input() preferenceData = defaultPreferenceData;
    title = "PoemComponent";
    displayModal = false;
    searchEngineUrl: string = "https://www.bing.com/search?q=";
    poemContent: string = "海上生明月，天涯共此时。";
    poemAuthor: string = "【张九龄】《望月怀远》";
    poemMaxSize: number = 30;
    customPoem = false;
    customContentInputValue = "";
    customAuthorInputValue = "";

    constructor(private message: NzMessageService) {}

    poemBtnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.minorColor;
        e.currentTarget.style.color = getFontColor(this.minorColor);
        e.currentTarget.classList.remove("poemText");
        e.currentTarget.classList.add("componentTheme");
    }

    poemBtnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = this.minorColor;
        e.currentTarget.classList.remove("componentTheme");
        e.currentTarget.classList.add("poemText");
    }

    poemContentBtnOnClick() {
        window.open(this.searchEngineUrl + this.poemContent, "_self");
    }

    showAddModalBtnOnClick() {
        this.displayModal = true;
    }

    modalOkBtnOnClick() {
        if (this.customContentInputValue.length > 0 && this.customAuthorInputValue.length > 0) {
            if (this.customContentInputValue.length <= 30 && this.customAuthorInputValue.length <= 30) {
                this.displayModal = false;

                this.customPoem = true;
                this.poemContent = this.customContentInputValue;
                this.poemAuthor = this.customAuthorInputValue;
                localStorage.setItem("customPoem", JSON.stringify(true));
                localStorage.setItem("customContent", this.customContentInputValue);
                localStorage.setItem("customAuthor", this.customAuthorInputValue);
                this.message.success("已使用自定诗词，一秒后刷新页面");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                this.message.error("表单内容长度不能超过30个字");
            }
        } else {
            this.message.error("表单不能为空");
        }
    }

    modalCancelBtnOnClick() {
        this.displayModal = false;
    }

    closeCustomPoemBtnOnClick() {
        this.displayModal = false;
        this.customPoem = false;
        localStorage.setItem("customPoem", JSON.stringify(false));
        localStorage.removeItem("customContent");
        localStorage.removeItem("customAuthor");

        this.message.success("已关闭自定诗词，一秒后刷新页面");
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    // 今日诗词
    setPoem(poemData: any) {
        let tempPoemContent = "";
        let tempPoemAuthor = "";

        if (this.preferenceData.autoTopic) {
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

    getPoem() {
        if (this.preferenceData.autoTopic) {
            poemRequest.load((result: any) => {
                localStorage.setItem("lastPoemRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
                localStorage.setItem("lastPoem", JSON.stringify(result));                   // 保存请求结果，防抖节流
                this.setPoem(result);
            }, (errorData: any) => {
                // 请求失败时使用上一次请求结果
                let lastPoem: any = localStorage.getItem("lastPoem");
                if (lastPoem) {
                    lastPoem = JSON.parse(lastPoem);
                    this.setPoem(lastPoem);
                } else {
                    this.message.error("获取诗词失败");
                }
            });
        } else {
            let tempThis = this;
            let headers = {};
            let url = "https://v1.jinrishici.com/" + this.preferenceData.poemTopic;
            let data = {};
            httpRequest(headers, url, data, "GET")
                .then(function (resultData: any) {
                    localStorage.setItem("lastPoemRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
                    localStorage.setItem("lastPoem", JSON.stringify(resultData));               // 保存请求结果，防抖节流
                    tempThis.setPoem(resultData);
                })
                .catch(function () {
                    // 请求失败时使用上一次请求结果
                    let lastPoem: any = localStorage.getItem("lastPoem");
                    if (lastPoem) {
                        lastPoem = JSON.parse(lastPoem);
                        tempThis.setPoem(lastPoem);
                    } else {
                        tempThis.message.error("获取诗词失败");
                    }
                });
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["preferenceData"]) {
            this.searchEngineUrl = getSearchEngineDetail(this.preferenceData.searchEngine).searchEngineUrl;
        }
    }

    ngOnInit(): void {
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
                this.poemContent = customContentStorage;
                this.poemAuthor = customAuthorStorage;
                this.customContentInputValue = customContentStorage;
                this.customAuthorInputValue = customAuthorStorage;
            }
        } else {
            // 防抖节流
            let lastPoemRequestTime: any = localStorage.getItem("lastPoemRequestTime");
            let nowTimeStamp = new Date().getTime();
            if (lastPoemRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
                this.getPoem();
            } else if (nowTimeStamp - parseInt(lastPoemRequestTime) > parseInt(this.preferenceData.changePoemTime)) {  // 必须多于切换间隔才能进行新的请求
                this.getPoem();
            } else {  // 切换间隔内使用上一次请求结果
                let lastPoem: any = localStorage.getItem("lastPoem");
                if (lastPoem) {
                    lastPoem = JSON.parse(lastPoem);
                    this.setPoem(lastPoem);
                } else {
                    this.message.error("获取诗词失败");
                }
            }
        }
    }

    protected readonly btnMouseOut = btnMouseOut;
    protected readonly btnMouseOver = btnMouseOver;
    protected readonly getFontColor = getFontColor;
}
