import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {NzMessageService} from 'ng-zorro-antd/message';
import {
    btnMouseOut,
    btnMouseOver,
    getFontColor,
    getPreferenceDataStorage, getTimeDetails,
    resetRadioColor, resetSwitchColor
} from "../../typescripts/publicFunctions";
import {defaultPreferenceData} from "../../typescripts/publicConstants";
import {PreferenceDataInterface} from "../../typescripts/publicInterface";

@Component({
    selector: "menuPreference-component",
    templateUrl: "./menuPreference.component.html",
    styleUrls: ["./menuPreference.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class menuPreferenceComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    title = "menuPreferenceComponent";
    formDisabled: boolean = false;
    displayResetPreferenceModal: boolean = false;
    displayClearStorageModal: boolean = false;
    preferenceData: PreferenceDataInterface = getPreferenceDataStorage();
    lastPoemRequestTime: string = "暂无信息";
    @Output() getPreferenceData: EventEmitter<PreferenceDataInterface> = new EventEmitter();
    protected readonly getFontColor = getFontColor;
    protected readonly btnMouseOver = btnMouseOver;
    protected readonly btnMouseOut = btnMouseOut;

    constructor(private message: NzMessageService) {}

    // 搜索引擎
    searchEngineRadioOnChange(value: string) {
        this.preferenceData = this.modifyPreferenceData({searchEngine: value});
        this.getPreferenceData.emit(this.preferenceData);
        localStorage.setItem("preferenceData", JSON.stringify(this.preferenceData));
        this.message.success("已更换搜索引擎");
        // resetRadioColor(value, ["bing", "google"], this.majorColor);
    }

    buttonShapeRadioOnChange(value: string) {
        this.preferenceData = this.modifyPreferenceData({buttonShape: value});
        this.getPreferenceData.emit(this.preferenceData);
        localStorage.setItem("preferenceData", JSON.stringify(this.preferenceData));
        this.message.success("已更换按钮形状");
        // resetRadioColor(value, ["round", "default"], this.majorColor);
    }

    // 诗词主题
    poemTopicsRadioOnChange(value: string) {
        this.preferenceData = this.modifyPreferenceData({poemTopic: value});
        this.getPreferenceData.emit(this.preferenceData);
        localStorage.setItem("preferenceData", JSON.stringify(this.preferenceData));
        this.message.success("已更换诗词主题，下次切换诗词时生效");
    }

    // 智能主题
    autoTopicSwitchOnChange(checked: boolean) {
        this.preferenceData = this.modifyPreferenceData({autoTopic: checked, changePoemTime: "3600000"});
        this.getPreferenceData.emit(this.preferenceData);
        localStorage.setItem("preferenceData", JSON.stringify(this.preferenceData));
        localStorage.removeItem("lastPoemRequestTime");  // 重置请求时间
        
        if (checked) {
            this.message.success("已开启自动主题，一秒后刷新页面");
        } else {
            this.message.success("已关闭自动主题，一秒后刷新页面");
        }
        this.formDisabled = true;
        this.refreshWindow();
    }

    // 切换间隔
    changePoemTimeOnChange(value: string) {
        this.preferenceData = this.modifyPreferenceData({changePoemTime: value});
        this.getPreferenceData.emit(this.preferenceData);
        localStorage.setItem("preferenceData", JSON.stringify(this.preferenceData));
        
        this.message.success("已修改切换间隔，一秒后刷新页面");
        this.formDisabled = true;
        this.refreshWindow();
    }

    // 极简模式
    simpleModeSwitchOnChange(checked: boolean) {
        this.preferenceData = this.modifyPreferenceData({simpleMode: checked});
        this.getPreferenceData.emit(this.preferenceData);
        localStorage.setItem("preferenceData", JSON.stringify(this.preferenceData));
        if (checked) {
            this.message.success("已开启极简模式");
        } else {
            this.message.success("已关闭极简模式，一秒后刷新页面");
            this.formDisabled = true;
            this.refreshWindow();
        }
        // resetSwitchColor("#simpleModeSwitch", checked, this.majorColor);
    }

    // 重置设置
    resetPreferenceBtnOnClick() {
        let resetTimeStampStorage = localStorage.getItem("resetTimeStamp");
        if (resetTimeStampStorage && new Date().getTime() - parseInt(resetTimeStampStorage) < 60 * 1000) {
            this.message.error("操作过于频繁，请稍后再试");
        } else {
            this.displayResetPreferenceModal = true;
        }
    }

    resetPreferenceOkBtnOnClick() {
        this.displayResetPreferenceModal = false;
        localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
        localStorage.setItem("resetTimeStamp", JSON.stringify(new Date().getTime()));
        this.message.success("已重置设置，一秒后刷新页面");
        this.formDisabled = true;
        this.refreshWindow();
    }

    resetPreferenceCancelBtnOnClick() {
        this.displayResetPreferenceModal = false;
    }

    // 重置插件
    clearStorageBtnOnClick() {
        let resetTimeStampStorage = localStorage.getItem("resetTimeStamp");
        if (resetTimeStampStorage && new Date().getTime() - parseInt(resetTimeStampStorage) < 60 * 1000) {
            this.message.error("操作过于频繁，请稍后再试");
        } else {
            this.displayClearStorageModal = true;
        }
    }

    clearStorageOkBtnOnClick() {
        this.displayClearStorageModal = false;
        localStorage.clear();
        localStorage.setItem("resetTimeStamp", JSON.stringify(new Date().getTime()));
        this.message.success("已重置所有内容，一秒后刷新页面");
        this.formDisabled = true;
        this.refreshWindow();
    }

    clearStorageCancelBtnOnClick() {
        this.displayClearStorageModal = false;
    }

    // 修改偏好设置
    modifyPreferenceData(data: Object) {
        return Object.assign({}, this.preferenceData, data);
    }

    refreshWindow() {
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    ngOnInit(): void {
        let lastPoemRequestTimeStorage = localStorage.getItem("lastPoemRequestTime");
        if (lastPoemRequestTimeStorage !== null) {
            this.lastPoemRequestTime = getTimeDetails(new Date(parseInt(lastPoemRequestTimeStorage))).showDetail;
        }
    }
}
