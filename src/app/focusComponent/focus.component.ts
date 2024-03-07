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
import focusSoundOne from "../../assets/focusSounds/古镇雨滴.mp3";
import focusSoundTwo from "../../assets/focusSounds/松树林小雪.mp3";

const focusAudio = new Audio();
const focusSoundsDictionary = {
    "focusSoundOne": focusSoundOne,
    "focusSoundTwo": focusSoundTwo,
}

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
    focusSound: string = "古镇雨滴";
    focusSoundIconUrl: string = "https://www.soundvery.com/KUpload/image/20240111/20240111145630_9331.png";
    focusAudioPaused: boolean = true;
    focusMaxSize: number = 10;
    browserType = getBrowserType();
   
    protected readonly getFontColor = getFontColor;

    constructor(private message: NzMessageService) {}

    setExtensionStorage(key: string, value: any) {
        if (["Chrome", "Edge"].indexOf(this.browserType) !== -1) {
            chrome.storage.local.set({[key]: value});
        }
        else if (["Firefox", "Safari"].indexOf(this.browserType) !== -1) {
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
        this.filterList = [];
        localStorage.removeItem("filterList");
        this.setExtensionStorage("filterList", []);
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
        if (this.inputValue && this.inputValue.length > 0 && this.inputValue.length <= 20) {
            this.filterList.push({
                "domain": this.inputValue,
                "timeStamp": Date.now()
            });
            localStorage.setItem("filterList", JSON.stringify(this.filterList));
            this.setExtensionStorage("filterList", this.filterList);

            this.displayModal = false;
            this.message.success("添加成功");
        } else if(this.inputValue && this.inputValue.length > 20) {
            this.message.error("域名不能超过20个字");
        } else {
            this.message.error("域名不能为空");
        }
    }

    modalCancelBtnOnClick() {
        this.displayModal = false;
    }

    focusSoundSelectOnChange(value: string) {
        switch (value) {
            case "古镇雨滴": {
                this.focusSoundIconUrl = "https://www.soundvery.com/KUpload/image/20240111/20240111145630_9331.png";
                break;
            }
            case "松树林小雪": {
                this.focusSoundIconUrl = "https://www.soundvery.com/KUpload/image/20240125/20240125190604_0946.png";
                break;
            }
            default: {
                this.focusSoundIconUrl = "https://www.soundvery.com/KUpload/image/20240111/20240111145630_9331.png";
            }
        }
        this.focusSound = value;
        this.focusAudioPaused = false;
        this.playFocusSound(value);
    }

    playBtnOnClick() {
        if (this.browserType !== "Safari") {
            if (focusAudio.paused) {
                this.focusAudioPaused = false;
                this.playFocusSound(this.focusSound);
            } else {
                this.focusAudioPaused = true;
                focusAudio.pause();
            }
        } else {
            this.message.error("Safari 暂不支持播放白噪音");
        }
    }

    playFocusSound(focusSound: string) {
        switch (focusSound) {
            case "古镇雨滴": {
                focusAudio.src = focusSoundsDictionary.focusSoundOne;
                break;
            }
            case "松树林小雪": {
                focusAudio.src = focusSoundsDictionary.focusSoundTwo;
                break;
            }
            default: {
                focusAudio.src = focusSoundsDictionary.focusSoundOne;
            }
        }
        focusAudio.loop = true;
        focusAudio.play();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["preferenceData"]) {
            this.display = this.preferenceData.simpleMode ? "none" : "block";
        }
    }

    ngOnInit(): void {
        this.display = this.preferenceData.simpleMode ? "none" : "block";

        // 初始化专注模式开启状态
        if (this.preferenceData.simpleMode) {
            this.focusMode = false;
            localStorage.setItem("focusMode", JSON.stringify(false));
            this.setExtensionStorage("focusMode", false);
        } else {
            let focusModeStorage = localStorage.getItem("focusMode");
            if (focusModeStorage) {
                this.focusMode = JSON.parse(focusModeStorage);
                if (JSON.parse(focusModeStorage) === true) {
                    this.message.info("已开启专注模式");
                }
            }
            else {
                localStorage.setItem("focusMode", JSON.stringify(false));
                this.setExtensionStorage("focusMode", false);
            }
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
    }

    protected readonly btnMouseOver = btnMouseOver;
    protected readonly btnMouseOut = btnMouseOut;
}
