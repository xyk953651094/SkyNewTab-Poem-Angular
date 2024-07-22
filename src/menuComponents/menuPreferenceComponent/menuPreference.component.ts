import {Component, EventEmitter, Input, OnInit, SimpleChanges, Output} from "@angular/core";
import {NzMessageService} from 'ng-zorro-antd/message';
import {
    btnMouseOut,
    btnMouseOver,
    getFontColor,
    getPreferenceDataStorage, getTimeDetails,
    resetRadioColor, resetSwitchColor
} from "../../typescripts/publicFunctions";
import {defaultPreferenceData, device} from "../../typescripts/publicConstants";
import {PreferenceDataInterface} from "../../typescripts/publicInterface";
import {NzUploadFile} from "ng-zorro-antd/upload";

@Component({
    selector: "menuPreference-component",
    templateUrl: "./menuPreference.component.html",
    styleUrls: ["./menuPreference.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class menuPreferenceComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    @Input() svgColors: string[] = ["#000000", "#000000", "#000000"];
    title = "menuPreferenceComponent";
    formDisabled: boolean = false;
    displayCustomThemeModal: boolean = false;
    customThemeState: boolean = false;
    customMajorColor: string = "#ffffff";
    customMinorColor: string = "#000000";
    customSvgColor0: string = "#000000";
    customSvgColor1: string = "#000000";
    customSvgColor2: string = "#000000";
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

    // 字体类型
    fontFamilyRadioOnChange(value: string) {
        if (value === "cursive") {
            this.preferenceData = this.modifyPreferenceData({fontFamily: value, fontVariant: "simplified"});
        } else {
            this.preferenceData = this.modifyPreferenceData({fontFamily: value});
        }
        this.getPreferenceData.emit(this.preferenceData);
        localStorage.setItem("preferenceData", JSON.stringify(this.preferenceData));
        this.message.success("已更换字体类型");
    }

    // 简繁切换
    fontVariantRadioOnChange(value: string) {
        this.preferenceData = this.modifyPreferenceData({fontVariant: value});
        this.getPreferenceData.emit(this.preferenceData);
        localStorage.setItem("preferenceData", JSON.stringify(this.preferenceData));
        if (value === "simplified") {
            this.message.success("已切换为简体中文");
        }
        if (value === "traditional") {
            this.message.success("已切换为繁体中文");
        }
    }

    // 自定颜色
    customThemeBtnOnClick() {
        this.displayCustomThemeModal = true;
    }

    customMajorColorOnChange(value: any) {
        this.customMajorColor = value;
    }

    customMinorColorOnChange(value: any) {
        this.customMinorColor = value;
    }

    customSvgColor0OnChange(value: any) {
        this.customSvgColor0 = value;
    }

    customSvgColor1OnChange(value: any) {
        this.customSvgColor1 = value;
    }

    customSvgColor2OnChange(value: any) {
        this.customSvgColor2 = value;
    }

    customThemeOkBtnOnClick() {
        this.displayCustomThemeModal = false;
        const customTheme = {
            majorColor: this.customMajorColor,
            minorColor: this.customMinorColor,
            svgColors: [this.customSvgColor0, this.customSvgColor1, this.customSvgColor2]
        }
        console.log(customTheme)

        this.customThemeState = true;
        localStorage.setItem("customThemeState", JSON.stringify(true));
        localStorage.setItem("theme", JSON.stringify(customTheme));
        this.message.success("已启用自定颜色，一秒后刷新页面");
        // this.refreshWindow();
    }

    customThemeCancelBtnOnClick() {
        this.displayCustomThemeModal = false;
    }

    disableCustomThemeBtnOnClick() {
        this.displayCustomThemeModal = false;
        this.customThemeState = false;
        localStorage.setItem("customThemeState", JSON.stringify(false));
        localStorage.removeItem("theme");
        this.message.success("已关闭自定颜色，一秒后刷新页面");
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

    // 导入数据（此处必需使用箭头函数）
    importDataBtnOnClick = (file: NzUploadFile) => {
        if (device !== "") {
            this.message.error("暂不支持移动端");
        } else {
            if (file.name.indexOf("云开诗词新标签页") === 0) {
                file["text"]().then((result: string) => {
                    let importData = JSON.parse(result);
                    if (importData) {
                        localStorage.setItem("daily", JSON.stringify(importData.dailyList ? importData.dailyList : []));
                        localStorage.setItem("dailyNotification", JSON.stringify(importData.dailyNotification ? importData.dailyNotification : false));
                        localStorage.setItem("todos", JSON.stringify(importData.todoList ? importData.todoList : []));
                        localStorage.setItem("todoNotification", JSON.stringify(importData.todoNotification ? importData.todoNotification : false));
                        localStorage.setItem("filterList", JSON.stringify(importData.filterList ? importData.filterList : []));
                        localStorage.setItem("linkList", JSON.stringify(importData.linkList ? importData.linkList : []));
                        localStorage.setItem("preferenceData", JSON.stringify(importData.preferenceData ? importData.preferenceData : defaultPreferenceData));

                        this.formDisabled = true;
                        this.message.success("导入数据成功，一秒后刷新页面");
                        this.refreshWindow();
                    } else {
                        this.message.error("导入数据失败");
                    }
                })
            } else {
                this.message.error("请选择正确的文件");
            }
        }
        return false;
    }

    // 导出数据
    exportDataBtnOnClick() {
        if (device !== "") {
            this.message.error("暂不支持移动端");
        } else {
            // 倒数日
            let tempDailyList = [];
            let dailyListStorage = localStorage.getItem("daily");
            if (dailyListStorage) {
                tempDailyList = JSON.parse(dailyListStorage);
            }

            let tempDailyNotification = false;
            let dailyNotificationStorage = localStorage.getItem("dailyNotification");
            if (dailyNotificationStorage) {
                tempDailyNotification = JSON.parse(dailyNotificationStorage);
            }

            // 待办事项
            let tempTodoList = [];
            let todoListStorage = localStorage.getItem("todos");
            if (todoListStorage) {
                tempTodoList = JSON.parse(todoListStorage);
            }

            let tempTodoNotification = false;
            let todoNotificationStorage = localStorage.getItem("todoNotification");
            if (todoNotificationStorage) {
                tempTodoNotification = JSON.parse(todoNotificationStorage);
            }

            // 专注模式过滤名单
            let tempFilterList = [];
            let filterListStorage = localStorage.getItem("filterList");
            if (filterListStorage) {
                tempFilterList = JSON.parse(filterListStorage);
            }

            // 快捷链接
            let tempLinkList = [];
            let linkListStorage = localStorage.getItem("linkList");
            if (linkListStorage) {
                tempLinkList = JSON.parse(linkListStorage);
            }

            let exportData = {
                title: "云开新标签页",
                attention: "请不要修改本文件的名称和内容",
                dailyList: tempDailyList,
                dailyNotification: tempDailyNotification,
                todoList: tempTodoList,
                todoNotification: tempTodoNotification,
                filterList: tempFilterList,
                linkList: tempLinkList,
                preferenceData: this.preferenceData,
            }

            let file = new Blob([JSON.stringify(exportData)], {type: "application/json"});
            const objectURL = URL.createObjectURL(file);
            let a = document.createElement("a");
            a.href = objectURL;
            a.download = "云开诗词新标签页.json";
            a.click();
            URL.revokeObjectURL(objectURL);
            this.message.success("导出数据成功");
        }
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

    ngOnChanges(changes: SimpleChanges) {
        if (changes["majorColor"]) {
            this.customMajorColor = changes["majorColor"].currentValue;
        }
        if (changes["minorColor"]) {
            this.customMinorColor = changes["minorColor"].currentValue;
        }
        if (changes["svgColors"]) {
            this.customSvgColor0 = changes["svgColors"].currentValue[0];
            this.customSvgColor1 = changes["svgColors"].currentValue[1];
            this.customSvgColor2 = changes["svgColors"].currentValue[2];
        }
    }

    ngOnInit(): void {
        let tempCustomThemeState = false;
        let customThemeStateStorage = localStorage.getItem("customThemeState");
        if (customThemeStateStorage) {
            tempCustomThemeState = JSON.parse(customThemeStateStorage);
            this.customThemeState = tempCustomThemeState;
        } else {
            localStorage.setItem("customThemeState", JSON.stringify(false));
        }

        let lastPoemRequestTimeStorage = localStorage.getItem("lastPoemRequestTime");
        if (lastPoemRequestTimeStorage !== null) {
            this.lastPoemRequestTime = getTimeDetails(new Date(parseInt(lastPoemRequestTimeStorage))).showDetail;
        }
    }

    protected readonly device = device;
}
