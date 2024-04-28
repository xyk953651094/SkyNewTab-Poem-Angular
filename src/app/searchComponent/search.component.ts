import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {btnMouseOut, btnMouseOver, getFontColor, getSearchEngineDetail} from "../../typescripts/publicFunctions";
import {defaultPreferenceData} from "../../typescripts/publicConstants";
import {NzButtonShape} from "ng-zorro-antd/button";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
    selector: "search-component",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class SearchComponent implements OnInit, OnChanges {
    @Input() majorColor: string = "#000000";
    @Input() minorColor: string = "#ffffff";
    @Input() preferenceData = defaultPreferenceData;
    title = "SearchComponent";
    display: "block" | "none" = "block";
    searchEngineName: string = "必应";
    searchEngineValue: string = "bing";
    searchEngineUrl: string = "https://www.bing.com/search?q=";
    buttonShape: NzButtonShape = "round";
    displayAddModal: boolean = false;
    displayEditModal: boolean = false;
    linkList: any[] = [];
    linkNameInputValue: string = "";
    linkUrlInputValue: string = "";
    linkMaxSize: number = 5;
    protected readonly getFontColor = getFontColor;

    constructor(private message: NzMessageService) {}

    removeAllBtnOnClick() {
        this.linkList = [];
        localStorage.removeItem("linkList");
        this.message.success("删除成功");
    }

    removeBtnOnClick(item: any) {
        let tempLinkList = this.linkList;   // 深拷贝，不然删除后视图无法更新
        let index = -1;
        for (let i = 0; i < tempLinkList.length; i++) {
            if (item.timeStamp === tempLinkList[i].timeStamp) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            tempLinkList.splice(index, 1);
        }

        this.linkList = tempLinkList;
        localStorage.setItem("linkList", JSON.stringify(tempLinkList));
        this.message.success("删除成功");
    }

    linkBtnOnClick(item: any) {
        window.open(item.linkUrl, "_self");
    }

    onPressEnter(e: any) {
        if (e.keyCode === 13) {
            window.open(this.searchEngineUrl + e.target.value, "_self");
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

    showAddModalBtnOnClick() {
        if (this.linkList.length < this.linkMaxSize) {
            this.displayAddModal = true;
            this.linkNameInputValue = "";
            this.linkUrlInputValue = "";
        } else {
            this.message.error("链接数量最多为" + this.linkMaxSize + "个");
        }
    }

    showEditModalBtnOnClick() {
        this.displayEditModal = true;
    }

    addModalOkBtnOnClick() {
        if (this.linkNameInputValue.length > 0 && this.linkUrlInputValue.length > 0) {
            if (this.linkNameInputValue.length <= this.linkMaxSize) {
                let urlRegExp = new RegExp("(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]", "g");
                if (urlRegExp.exec(this.linkUrlInputValue) !== null) {
                    this.linkList.push({
                        "linkName": this.linkNameInputValue,
                        "linkUrl": this.linkUrlInputValue,
                        "timeStamp": Date.now()
                    });

                    this.displayAddModal = false;
                    localStorage.setItem("linkList", JSON.stringify(this.linkList));
                    this.message.success("添加成功");
                } else {
                    this.message.error("链接地址格式错误");
                }
            } else {
                this.message.error("链接名称字数不能超过" + this.linkMaxSize + "个");
            }
        } else {
            this.message.error("表单不能为空");
        }
    }

    addModalCancelBtnOnClick() {
        this.displayAddModal = false;
    }

    editNameInputOnPressEnter(item: any, e: any) {
        if (e.keyCode === 13 && e.target.value.length > 0) {
            let tempLinkList = this.linkList;

            let index = -1;
            for (let i = 0; i < tempLinkList.length; i++) {
                if (item.timeStamp === tempLinkList[i].timeStamp) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                tempLinkList[index].linkName = e.target.value;

                localStorage.setItem("linkList", JSON.stringify(tempLinkList));
                this.linkList = tempLinkList;
                this.message.success("修改成功");
            } else {
                this.message.error("修改失败");
            }
        } else {
            this.message.warning("链接名称不能为空");
        }
    }

    editUrlInputOnPressEnter(item: any, e: any) {
        if (e.keyCode === 13 && e.target.value.length > 0) {
            let tempLinkList = this.linkList;

            let index = -1;
            for (let i = 0; i < tempLinkList.length; i++) {
                if (item.timeStamp === tempLinkList[i].timeStamp) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                tempLinkList[index].linkUrl = e.target.value;

                localStorage.setItem("linkList", JSON.stringify(tempLinkList));
                this.linkList = tempLinkList;
                this.message.success("修改成功");
            } else {
                this.message.error("修改失败");
            }
        } else {
            this.message.warning("链接地址不能为空");
        }
    }

    editModalOkBtnOnClick() {
        this.displayEditModal = false;
    }

    editModalCancelBtnOnClick() {
        this.displayEditModal = false;
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
        let linkListStorage = localStorage.getItem("linkList");
        if (linkListStorage) {
            this.linkList = JSON.parse(linkListStorage);
        }
    }

    protected readonly btnMouseOver = btnMouseOver;
    protected readonly btnMouseOut = btnMouseOut;
}
