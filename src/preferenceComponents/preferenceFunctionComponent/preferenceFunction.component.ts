import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {NzMessageService} from 'ng-zorro-antd/message';
import {getFontColor, getPreferenceDataStorage, btnMouseOver, btnMouseOut} from "../../typescripts/publicFunctions";
import {defaultPreferenceData} from "../../typescripts/publicConstants";
import {PreferenceDataInterface} from "../../typescripts/publicInterface";

@Component({
    selector: "preferenceFunction-component",
    templateUrl: "./preferenceFunction.component.html",
    styleUrls: ["./preferenceFunction.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class preferenceFunctionComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    title = "preferenceFunctionComponent";
    preferenceData: PreferenceDataInterface = getPreferenceDataStorage();
    @Output() getPreferenceFunctionData: EventEmitter<PreferenceDataInterface> = new EventEmitter();
    protected readonly getFontColor = getFontColor;

    constructor(private message: NzMessageService) {}

    // 搜索引擎
    searchEngineRadioOnChange(value: string) {
        this.preferenceData = this.modifyPreferenceData({searchEngine: value});
        this.getPreferenceFunctionData.emit(this.preferenceData);
        localStorage.setItem("preferenceData", JSON.stringify(this.preferenceData));
        this.message.success("已更换搜索引擎");
    }

    buttonShapeRadioOnChange(value: string) {
        this.preferenceData = this.modifyPreferenceData({buttonShape: value});
        this.getPreferenceFunctionData.emit(this.preferenceData);
        localStorage.setItem("preferenceData", JSON.stringify(this.preferenceData));
        this.message.success("已更换按钮形状，一秒后刷新页面");
        this.refreshWindow();
    }

    // 简洁模式
    simpleModeSwitchOnChange(checked: boolean) {
        this.preferenceData = this.modifyPreferenceData({simpleMode: checked});
        this.getPreferenceFunctionData.emit(this.preferenceData);
        localStorage.setItem("preferenceData", JSON.stringify(this.preferenceData));
        if (checked) {
            this.message.success("已开启简洁模式，一秒后刷新页面");
        } else {
            this.message.success("已关闭简洁模式，一秒后刷新页面");
        }
        this.refreshWindow();
    }

    displayAlertSwitchOnChange(checked: boolean) {
        this.preferenceData = this.modifyPreferenceData({displayAlert: checked});
        this.getPreferenceFunctionData.emit(this.preferenceData);
        localStorage.setItem("preferenceData", JSON.stringify(this.preferenceData));
        if (checked) {
            this.message.success("已显示提示信息");
        } else {
            this.message.success("已隐藏提示信息");
        }
    }

    // 重置设置
    clearStorageBtnOnClick() {
        localStorage.clear();
        this.message.success("已重置所有内容，一秒后刷新页面");
        this.refreshWindow();
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
        let tempPreferenceData = localStorage.getItem("preferenceData");
        if (tempPreferenceData === null) {
            localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
            this.preferenceData = defaultPreferenceData;
        } else {
            return JSON.parse(tempPreferenceData);
        }
    }

    protected readonly btnMouseOver = btnMouseOver;
    protected readonly btnMouseOut = btnMouseOut;
}
