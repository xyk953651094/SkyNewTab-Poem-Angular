/// <reference types="chrome"/>
/// <reference types="firefox-webext-browser"/>

import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {
    btnMouseOut,
    btnMouseOver,
    getBrowserType,
    getFontColor, getTimeDetails,
    resetSwitchColor
} from "../../typescripts/publicFunctions";
import {NzMessageService} from "ng-zorro-antd/message";
import focusSoundOne from "../../assets/focusSounds/古镇雨滴.mp3";
import focusSoundTwo from "../../assets/focusSounds/松树林小雪.mp3";
import focusSoundThree from "../../assets/focusSounds/漓江水.mp3";
import focusSoundFour from "../../assets/focusSounds/泉水水滴.mp3";

const focusAudio = new Audio();

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
    displayModal: boolean = false;
    focusMode: boolean = false;
    inputValue: string = "";
    filterList: any[] = [];
    focusPeriod: string = "manual";
    focusEndTime: string = "未开启专注模式";
    focusSound: string = "none";
    focusMaxSize: number = 10;
    browserType = getBrowserType();

    protected readonly getFontColor = getFontColor;

    constructor(private message: NzMessageService) {}

    setExtensionStorage(key: string, value: any) {
        try {
            if (["Chrome", "Edge"].indexOf(this.browserType) !== -1) {
                chrome.storage.local.set({[key]: value});
            }
            else if (["Firefox", "Safari"].indexOf(this.browserType) !== -1) {
                browser.storage.local.set({[key]: value});
            }
        } catch (error: any) {
            console.error("Error writing to localStorage:", error);
        }
    }

    focusModeSwitchOnChange(checked: boolean) {
        let tempFocusEndTime: string;
        let tempFocusEndTimeStamp: number;
        if (checked) {
            if (this.filterList.length === 0) {
                this.message.warning("请先添加名单");
            }

            if (this.focusPeriod === "manual") {
                tempFocusEndTime = "手动结束";
                tempFocusEndTimeStamp = 0;
            } else {
                tempFocusEndTimeStamp = Date.now() + Number(this.focusPeriod);
                tempFocusEndTime = getTimeDetails(new Date(tempFocusEndTimeStamp)).showDetail;
            }
        } else {
            tempFocusEndTime = "未开启专注模式";
            tempFocusEndTimeStamp = -1;
        }

        this.focusMode = checked;
        this.focusEndTime = tempFocusEndTime;
        localStorage.setItem("focusMode", JSON.stringify(checked));
        localStorage.setItem("focusPeriod", JSON.stringify(this.focusPeriod));
        localStorage.setItem("focusEndTimeStamp", JSON.stringify(tempFocusEndTimeStamp));
        this.setExtensionStorage("focusMode", checked);
        this.setExtensionStorage("focusEndTimeStamp", tempFocusEndTimeStamp);

        this.autoStopFocus(tempFocusEndTimeStamp);

        resetSwitchColor("#focusModeSwitch", checked, this.majorColor);

        // 关闭时停止播放白噪音
        if (!checked && !focusAudio.paused) {
            focusAudio.pause();
        }
    }

    removeAllBtnOnClick() {
        this.filterList = [];
        localStorage.removeItem("filterList");
        this.setExtensionStorage("filterList", []);
        this.message.success("删除成功");
    }

    removeBtnOnClick(item: any) {
        let index = -1;
        for (let i = 0; i < this.filterList.length; i++) {
            if (item.timeStamp === this.filterList[i].timeStamp) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            this.filterList.splice(index, 1);
        }

        localStorage.setItem("filterList", JSON.stringify(this.filterList));
        this.setExtensionStorage("filterList", this.filterList);
        this.message.success("删除成功");
    }

    showAddModalBtnOnClick() {
        if (this.filterList.length < this.focusMaxSize) {
            this.displayModal = true;
            this.inputValue = "";
        } else {
            this.message.error("域名数量最多为" + this.focusMaxSize + "个");
        }
    }

    modalOkBtnOnClick() {
        if (this.inputValue && this.inputValue.length > 0 && this.inputValue.length <= 30) {
            this.filterList.push({
                "domain": this.inputValue,
                "timeStamp": Date.now()
            });
            localStorage.setItem("filterList", JSON.stringify(this.filterList));
            this.setExtensionStorage("filterList", this.filterList);

            this.displayModal = false;
            this.message.success("添加成功");
        } else if(this.inputValue && this.inputValue.length > 30) {
            this.message.error("域名不能超过30个字");
        } else {
            this.message.error("域名不能为空");
        }
    }

    modalCancelBtnOnClick() {
        this.displayModal = false;
    }

    focusTimeSelectOnChange(value: string) {
        this.focusPeriod = value;
    }

    focusSoundSelectOnChange(value: string) {
        this.focusSound = value;
        if (value === "none") {
            focusAudio.pause();
        } else {
            this.playFocusSound(this.focusSound);
        }
    }

    playFocusSound(focusSound: string) {
        switch (focusSound) {
            case "古镇雨滴": {
                // focusAudio.src = "https://www.soundvery.com/KUpload/file/20240111/20240111145637_8657.mp3";
                focusAudio.src = focusSoundOne;
                break;
            }
            case "松树林小雪": {
                // focusAudio.src = "https://www.soundvery.com/KUpload/file/20240125/20240125190612_0979.mp3";
                focusAudio.src = focusSoundTwo;
                break;
            }
            case "漓江水": {
                // focusAudio.src = "https://www.soundvery.com/KUpload/file/20240406/20240406102328_8511.mp3";
                focusAudio.src = focusSoundThree;
                break;
            }
            case "泉水水滴": {
                // focusAudio.src = "https://www.soundvery.com/KUpload/file/20240406/20240406105745_9941.mp3";
                focusAudio.src = focusSoundFour;
                break;
            }
            default: {
                // focusAudio.src = "https://www.soundvery.com/KUpload/file/20240111/20240111145637_8657.mp3";
                focusAudio.src = focusSoundOne;
            }
        }
        focusAudio.loop = true;
        focusAudio.play();
    }

    // 倒计时自动关闭专注模式
    autoStopFocus(focusEndTimeStamp: number) {
        if (this.focusMode && focusEndTimeStamp > 0 && Date.now() < focusEndTimeStamp) {
            let interval = setInterval(() => {
                if (Date.now() >= focusEndTimeStamp) {
                    this.focusMode = false;
                    this.focusPeriod = "manual";
                    this.focusEndTime = "未开启专注模式";
                    this.focusSound= "none";
                    this.resetFocusModeStorage();
                    this.message.info("已结束专注模式");
                    focusAudio.pause();
                    clearInterval(interval);
                }
            }, 1000);
        }
    }

    resetFocusModeStorage() {
        localStorage.setItem("focusMode", JSON.stringify(false));
        localStorage.setItem("focusPeriod", JSON.stringify("manual"));
        localStorage.setItem("focusEndTimeStamp", JSON.stringify(-1));
        this.setExtensionStorage("focusMode", false);
        this.setExtensionStorage("focusEndTimeStamp", -1);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["preferenceData"]) {
            this.display = this.preferenceData.simpleMode ? "none" : "block";

            if (this.preferenceData.simpleMode) {
                this.focusMode = false;
                this.focusPeriod = "manual";
                this.focusEndTime = "未开启专注模式";
                this.focusSound= "none";
                this.resetFocusModeStorage();
            }
        }
    }

    ngOnInit(): void {
        this.display = this.preferenceData.simpleMode ? "none" : "block";

        // 初始化专注模式开启状态
        let focusModeStorage = localStorage.getItem("focusMode");
        if (focusModeStorage) {
            this.focusMode = JSON.parse(focusModeStorage);
        }
        else {
            localStorage.setItem("focusMode", JSON.stringify(false));
            this.setExtensionStorage("focusMode", false);
        }

        // 初始化名单
        let filterListStorage = localStorage.getItem("filterList");
        if (filterListStorage) {
            this.filterList = JSON.parse(filterListStorage);
        }
        else {
            localStorage.setItem("filterList", JSON.stringify([]));
            this.setExtensionStorage("filterList", []);
        }

        // 初始化专注时间
        let focusPeriodStorage = localStorage.getItem("focusPeriod");
        if (focusPeriodStorage) {
            this.focusPeriod = JSON.parse(focusPeriodStorage);
        } else {
            localStorage.setItem("focusPeriod", JSON.stringify("manual"));
        }

        // 初始化专注截止时间
        let tempFocusEndTimeStamp = -1;
        let focusEndTimeStampStorage = localStorage.getItem("focusEndTimeStamp");
        if (focusEndTimeStampStorage) {
            tempFocusEndTimeStamp = JSON.parse(focusEndTimeStampStorage);

            if (tempFocusEndTimeStamp === -1) {
                this.focusEndTime = "未开启专注模式";
            } else if (tempFocusEndTimeStamp === 0) {
                this.focusEndTime = "手动结束";
            } else {
                this.focusEndTime = getTimeDetails(new Date(tempFocusEndTimeStamp)).showDetail;
            }
        } else {
            localStorage.setItem("focusEndTimeStamp", JSON.stringify(-1));
            this.setExtensionStorage("focusEndTimeStamp", -1);
        }

        // 极简模式下或者专注时段过去后关闭专注模式
        if (this.preferenceData.simpleMode || (this.focusMode && tempFocusEndTimeStamp > 0 && Date.now() > tempFocusEndTimeStamp)) {
            this.focusMode = false;
            this.focusPeriod = "manual";
            this.focusEndTime = "未开启专注模式";
            this.resetFocusModeStorage();
        }

        if (this.focusMode) {
            this.message.info("已开启专注模式");
        }

        this.autoStopFocus(tempFocusEndTimeStamp);
    }

    protected readonly btnMouseOver = btnMouseOver;
    protected readonly btnMouseOut = btnMouseOut;
}
