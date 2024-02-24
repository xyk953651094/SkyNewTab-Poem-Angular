import {Component, OnInit} from "@angular/core";
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {
    getFontColor,
    getHolidayDataStorage,
    getPreferenceDataStorage, resetRadioColor, resetSwitchColor,
    setColorTheme
} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";
import $ from "jquery";
import {poemTopics} from "../typescripts/publicConstants";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss", "../stylesheets/publicStyles.scss"]
})
export class AppComponent implements OnInit {
    title = "云开诗词新标签页";
    majorColor = "#000000";
    minorColor: string = "#ffffff";
    svgColors: string[] = ["#ffffff", "#ffffff", "#ffffff", "#ffffff"];
    preferenceData: PreferenceDataInterface = getPreferenceDataStorage();
    holidayData: any = getHolidayDataStorage();

    constructor(private notification: NzNotificationService) {}

    getPreferenceData(value: PreferenceDataInterface) {
        this.preferenceData = value;
    }

    getHolidayData(value: any) {
        this.holidayData = value;
    }

    // 随机颜色主题
    setColorTheme() {
        // 随机颜色主题
        let themeArray = setColorTheme();
        localStorage.setItem("themeArray", JSON.stringify(themeArray));
        this.majorColor = themeArray.majorColor;
        this.minorColor = themeArray.minorColor;
        this.svgColors = themeArray.svgColors;

        // 修改弹窗主题
        let bodyEle = $("body");
        bodyEle.bind("DOMNodeInserted", () => {
            // 通用
            $(".ant-list-item").css("padding", "6px 0");
            $(".ant-list-item:not(:last-child)").css("border-bottom", "1px solid " + getFontColor(this.minorColor));
            $(".ant-list-item-action").css("marginInlineStart", "0");
            $(".ant-empty-description").css({
                "color": getFontColor(this.minorColor),
                "font-family": "'Times New Roman', cursive, sans-serif",
            });

            // popover
            let popoverEle = $(".ant-popover");
            if (popoverEle.length && popoverEle.length > 0) {
                $(".ant-popover-arrow").css("display", "none");
                // $(".ant-popover-inner").css("box-shadow", "none");
                $(".ant-popover-inner").css("border-radius", "2px");
                $(".ant-popover-title").css({
                    "color": getFontColor(this.minorColor),
                    "font-family": "'Times New Roman', cursive, sans-serif",
                    "font-weight": "bold",
                    "background-color": this.minorColor,
                    "border-color": this.minorColor,
                    "border-top-left-radius": "2px",
                    "border-top-right-radius": "2px"
                });
                $(".ant-popover-inner-content").css({
                    "color": getFontColor(this.minorColor),
                    "background-color": this.minorColor,
                    "border-bottom-left-radius": "2px",
                    "border-bottom-right-radius": "2px"
                });
                $(".ant-select-item").css("font-family", "'Times New Roman', cursive, sans-serif");
                $(".ant-form-item-extra").css({
                    "color": getFontColor(this.minorColor),
                    "font-family": "Times New Roman, cursive, sans-serif"
                });

                // focusComponent
                let focusMode = localStorage.getItem("focusMode");
                if (focusMode) {
                    resetSwitchColor("#focusModeSwitch", JSON.parse(focusMode), this.majorColor);
                }
            }

            // toolTip
            let toolTipEle = $(".ant-tooltip");
            if (toolTipEle.length && toolTipEle.length > 0) {
                $(".ant-tooltip-arrow").css("display", "none");
                $(".ant-tooltip-inner").css({
                    "color": getFontColor(this.minorColor),
                    "font-family": "Times New Roman, cursive, sans-serif"
                });
            }

            // message
            let messageEle = $(".ant-message");
            if (messageEle.length && messageEle.length > 0) {
                $(".ant-message-notice-content").css({
                    "backgroundColor": this.minorColor,
                    "color": getFontColor(this.minorColor),
                    "font-family": "Times New Roman, cursive, sans-serif"
                });
                $(".ant-message-custom-content > .anticon").css({
                    "color": getFontColor(this.minorColor),
                });
            }

            // notification
            let notificationEle = $(".ant-notification");
            if (notificationEle.length && notificationEle.length > 0) {
                $(".ant-notification-notice").css({"backgroundColor": this.minorColor});
                $(".ant-notification-notice-icon").css("color", getFontColor(this.minorColor));
                $(".ant-notification-notice-message").css({"color": getFontColor(this.minorColor), "font-family": "Times New Roman, cursive, sans-serif"});
                $(".ant-notification-notice-description").css({"color": getFontColor(this.minorColor), "font-family": "Times New Roman, cursive, sans-serif"});
            }

            // drawer
            let drawerEle = $(".ant-drawer");
            if (drawerEle.length && drawerEle.length > 0) {
                $(".ant-drawer-header").css({
                    "background-color": this.minorColor,
                    "border-bottom": "1px solid " + getFontColor(this.minorColor)
                });
                $(".ant-drawer-title").css({
                    "color": getFontColor(this.minorColor),
                    "font-family": "Times New Roman, cursive, sans-serif"
                });
                $(".ant-card-head").css({
                    "background-color": this.minorColor,
                    "border-bottom": "2px solid " + getFontColor(this.minorColor)
                });
                $(".ant-card-head-title").css({
                    "color": getFontColor(this.minorColor),
                    "font-family": "Times New Roman, cursive, sans-serif"
                });
                $(".ant-form-item-label > label").css({
                    "color": getFontColor(this.minorColor),
                    "font-family": "Times New Roman, cursive, sans-serif"
                });
                $(".ant-form-item-extra").css({
                    "color": getFontColor(this.minorColor),
                    "font-family": "Times New Roman, cursive, sans-serif"
                });
                $(".ant-radio-wrapper").children(":last-child").css({
                    "color": getFontColor(this.minorColor),
                    "font-family": "Times New Roman, cursive, sans-serif"
                });
                $(".ant-select-item").css("font-family", "'Times New Roman', cursive, sans-serif");
                $(".ant-drawer-footer").css("background-color", this.minorColor);

                // menuPreferenceComponent
                resetRadioColor(this.preferenceData.searchEngine, ["bing", "google"], this.majorColor);
                resetRadioColor(this.preferenceData.buttonShape, ["round", "default"], this.majorColor);
                resetRadioColor(this.preferenceData.poemTopic, poemTopics, this.majorColor);
                resetSwitchColor("#autoTopicSwitch", this.preferenceData.autoTopic, this.majorColor);
                resetSwitchColor("#simpleModeSwitch", this.preferenceData.simpleMode, this.majorColor);
            }

            // modal
            let modalEle = $(".ant-modal");
            if (modalEle.length && modalEle.length > 0) {
                $(".ant-modal-close-icon").css("color", getFontColor(this.minorColor))
                $(".ant-modal-header").css({
                    "background-color": this.minorColor,
                    "border-color": this.minorColor
                });
                $(".ant-modal-title").css({
                    "background-color": this.minorColor,
                    "color": getFontColor(this.minorColor),
                    "font-family": "Times New Roman, cursive, sans-serif"
                });
                $(".ant-modal-footer").css({
                    "backgroundColor": this.minorColor,
                    "border-color": this.minorColor
                });
                $(".ant-modal-footer > .ant-btn").css({
                    "color": getFontColor(this.minorColor),
                    "font-family": "Times New Roman, cursive, sans-serif"
                })
                if (this.preferenceData.buttonShape === "round") {
                    $(".ant-modal-footer > .ant-btn").removeClass("ant-btn-default ant-btn-primary").addClass("poemFont ant-btn-round ant-btn-text");
                } else {
                    $(".ant-modal-footer > .ant-btn").removeClass("ant-btn-round ant-btn-default ant-btn-primary").addClass("poemFont ant-btn-text");
                }
                $(".ant-modal-footer > .ant-btn").on("mouseover", (e: any) => {
                    e.currentTarget.style.backgroundColor = this.majorColor;
                    e.currentTarget.style.color = getFontColor(this.majorColor);
                });
                $(".ant-modal-footer > .ant-btn").on("mouseout", (e: any) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = getFontColor(this.minorColor);
                });
            }
        });

        // const observer = new MutationObserver((mutations) => {
        //     mutations.forEach((mutation) => {
        //         // 插入节点时
        //         if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        //
        //         }
        //     });
        // });
        // observer.observe(document.body, {childList: true});
    }

    ngOnInit(): void {
        // 颜色主题
        this.setColorTheme();

        // 版本号提醒
        let storageVersion = localStorage.getItem("SkyNewTabPoemAngularVersion");
        let currentVersion = require('../../package.json').version;
        if (storageVersion !== currentVersion) {
            this.notification.blank(
                "已更新至版本 V" + currentVersion,
                "详细内容请前往 GitHub 或 GitLab 主页查看",
                {nzPlacement: "bottomLeft", nzDuration: 5000, nzCloseIcon: "null"}
            );
            localStorage.setItem("SkyNewTabPoemAngularVersion", currentVersion);

            setTimeout(() => {
                this.notification.blank(
                    "支持作者",
                    "如果喜欢这款插件，请在插件商店五星好评",
                    {nzPlacement: "bottomLeft", nzDuration: 5000, nzCloseIcon: "null"}
                );
            }, 1000);

            // 额外提醒
            if (currentVersion === "3.1.0") {
                setTimeout(() => {
                    this.notification.blank(
                        "重要通知",
                        "本次更新修改了偏好设置中的切换间隔，如出现异常请点击重置设置按钮",
                        {nzPlacement: "bottomLeft", nzDuration: 10000, nzCloseIcon: "null"}
                    );
                }, 2000);
            }
        }
    }

    protected readonly getFontColor = getFontColor;
}
