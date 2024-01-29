/// <reference types="chrome"/>
/// <reference types="firefox-webext-browser"/>

import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {
    btnMouseOut,
    btnMouseOver,
    getBrowserType,
    getFontColor,
    resetSwitchColor
} from "../../typescripts/publicFunctions";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
    selector: "focus-component",
    templateUrl: "./focus.component.html",
    styleUrls: ["./focus.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class FocusComponent implements OnInit, OnChanges {
    @Input() majorColor: string = "#000000";
    @Input() minorColor: string = "#ffffff";
    @Input() preferenceData: any = {};
    title = "FocusComponent";
    display: "block" | "none" = "block";
    focusMode: boolean = false;
    focusFilter: string = "whiteListFilter";
    inputValue: string = "";
    filterList: any[] = [];
    focusMaxSize: number = 5;
   
    protected readonly getFontColor = getFontColor;

    constructor(private message: NzMessageService) {}

    setExtensionStorage(key: string, value: any) {
        const browserType = getBrowserType();
        if (["Chrome", "Edge"].indexOf(browserType) !== -1) {
            chrome.storage.local.set({[key]: value});
        }
        else if (["Firefox", "Safari"].indexOf(browserType) !== -1) {
            browser.storage.local.set({[key]: value});
        }
    }

    focusModeSwitchOnChange(checked: boolean) {
        this.focusMode = checked;
        localStorage.setItem("focusMode", JSON.stringify(checked));
        this.setExtensionStorage("focusMode", checked);
        resetSwitchColor("#focusModeSwitch", checked, this.majorColor);
    }

    removeAllBtnOnClick() {
        let tempFilterList = localStorage.getItem("filterList");
        if (tempFilterList) {
            this.filterList = [];
            localStorage.removeItem("filterList");
            this.setExtensionStorage("filterList", []);
        }
    }

    switchFilterBtnOnClick() {
        let tempFocusFilter = (this.focusFilter === "whiteListFilter" ? "blackListFilter" : "whiteListFilter");
        this.focusFilter = tempFocusFilter;
        localStorage.setItem("focusFilter", tempFocusFilter);
        this.setExtensionStorage("focusFilter", tempFocusFilter);
    }

    addFilterListBtnOnClick() {
        if (this.filterList.length < this.focusMaxSize) {
            if (this.inputValue && this.inputValue.length > 0 && this.inputValue.length <= 20) {
                let tempFilterList = this.filterList;
                tempFilterList.push({
                    "domain": this.inputValue,
                    "timeStamp": Date.now()
                });

                this.inputValue = "";
                this.filterList = tempFilterList;
                localStorage.setItem("filterList", JSON.stringify(this.filterList));
                this.setExtensionStorage("filterList", this.filterList);
            } else if(this.inputValue && this.inputValue.length > 20) {
                this.message.error("域名不能超过20个字");
            } else {
                this.message.error("域名不能为空");
            }
        } else {
            this.message.error("名单数量最多为" + this.focusMaxSize + "个");
        }
    }

    removeBtnOnClick(item: any) {
        let filterList = [];
        let tempFilterList = localStorage.getItem("filterList");
        if (tempFilterList) {
            filterList = JSON.parse(tempFilterList);
            let index = -1;
            for (let i = 0; i < filterList.length; i++) {
                if (item.timeStamp === filterList[i].timeStamp) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                filterList.splice(index, 1);
            }
            localStorage.setItem("filterList", JSON.stringify(filterList));
            this.setExtensionStorage("filterList", filterList);

            this.filterList = filterList;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["preferenceData"]) {
            this.display = this.preferenceData.simpleMode ? "none" : "block";
        }
    }

    ngOnInit(): void {
        // 初始化专注模式开启状态
        let tempFocusMode = false;
        let focusModeStorage = localStorage.getItem("focusMode");
        if (focusModeStorage) {
            tempFocusMode = JSON.parse(focusModeStorage);
        }
        else {
            localStorage.setItem("focusMode", JSON.stringify(false));
            this.setExtensionStorage("focusMode", false);
        }

        // 初始化过滤模式
        let tempFocusFilter = "whiteListFilter";
        let focusFilterStorage = localStorage.getItem("focusFilter");
        if (focusFilterStorage) {
            tempFocusFilter = focusFilterStorage
        } else {
            localStorage.setItem("focusFilter", "whiteListFilter");
            this.setExtensionStorage("focusFilter", "whiteListFilter");
        }

        // 初始化名单
        let tempFilterList = [];
        let filterListStorage = localStorage.getItem("filterList");
        if (filterListStorage) {
            tempFilterList = JSON.parse(filterListStorage);
        }
        else {
            localStorage.setItem("filterList", JSON.stringify([]));
            this.setExtensionStorage("filterList", []);
        }

        this.display = this.preferenceData.simpleMode ? "none" : "block";
        this.focusMode = tempFocusMode;
        this.focusFilter = tempFocusFilter;
        this.filterList = tempFilterList;

        if (this.preferenceData.simpleMode) {
            this.focusMode = false;
            localStorage.setItem("focusMode", JSON.stringify(false));
            this.setExtensionStorage("focusMode", false);
        }
    }

    protected readonly btnMouseOver = btnMouseOver;
    protected readonly btnMouseOut = btnMouseOut;
}
