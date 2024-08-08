import {Component, OnInit} from "@angular/core";
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {
  getFontColor,
  getHolidayDataStorage,
  getPreferenceDataStorage, resetRadioColor, resetSwitchColor,
  setTheme,
  setFont, getExtensionStorage, setExtensionStorage
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
    svgColors: string[] = ["#ffffff", "#ffffff", "#ffffff"];
    preferenceData: PreferenceDataInterface = getPreferenceDataStorage();
    holidayData: any = getHolidayDataStorage();

    constructor(private notification: NzNotificationService) {}

    getTheme(value: any) {
        this.majorColor = value.majorColor;
        this.minorColor = value.minorColor;
        this.svgColors = value.svgColors;
    }

    getPreferenceData(value: PreferenceDataInterface) {
        this.preferenceData = value;
    }

    getHolidayData(value: any) {
        this.holidayData = value;
    }

    // 随机颜色主题
    setColorTheme() {
        // 设置颜色主题
        let tempThemeStorage = getExtensionStorage("theme", null);
        if (tempThemeStorage) {
          let bodyEle = $("body");
          bodyEle.css("backgroundColor", tempThemeStorage.majorColor + " !important");
        } else {
          tempThemeStorage = setTheme();
        }
        this.majorColor = tempThemeStorage.majorColor;
        this.minorColor = tempThemeStorage.minorColor;
        this.svgColors = tempThemeStorage.svgColors;

        // 设置字体(需要优化)
        setFont(".poemFont", this.preferenceData);

        // 修改弹窗主题
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                // 插入节点时
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // 通用
                    $(".ant-list-header, .ant-list-item").css("borderBlockEndColor", getFontColor(this.minorColor));
                    $(".ant-list-header, .ant-list-item, .ant-list-footer").css("padding", "6px 0");
                    $(".ant-list-item-action").css("marginInlineStart", "0");
                    $(".ant-empty-description").css({
                        "color": getFontColor(this.minorColor),
                    }).addClass("poemFont");

                    // popover
                    let popoverEle = $(".ant-popover");
                    if (popoverEle.length && popoverEle.length > 0) {
                        $(".ant-popover-arrow").css("display", "none");
                        // $(".ant-popover-inner").css("box-shadow", "none");
                        $(".ant-popover-inner").css("border-radius", "2px");
                        $(".ant-popover-title").css({
                            "color": getFontColor(this.minorColor),
                            "background-color": this.minorColor,
                            "border-color": this.minorColor,
                            "border-top-left-radius": "2px",
                            "border-top-right-radius": "2px"
                        }).addClass("poemFont");
                        $(".ant-popover-inner-content").css({
                            "color": getFontColor(this.minorColor),
                            "background-color": this.minorColor,
                            "border-bottom-left-radius": "2px",
                            "border-bottom-right-radius": "2px"
                        });
                        $(".ant-select-item").addClass("poemFont");
                        $(".ant-form-item-extra").css("color", getFontColor(this.minorColor)).addClass("poemFont");

                        let dailyNotificationStorage = getExtensionStorage("dailyNotification", false);
                        let todoNotificationStorage = getExtensionStorage("todoNotification", false);
                        let focusModeStorage = getExtensionStorage("focusMode", false);
                        resetSwitchColor("#dailyNotificationSwitch", dailyNotificationStorage, this.majorColor);
                        resetSwitchColor("#todoNotificationSwitch", todoNotificationStorage, this.majorColor);
                        resetSwitchColor("#focusModeSwitch", focusModeStorage, this.majorColor);
                    }

                    // toolTip
                    let toolTipEle = $(".ant-tooltip");
                    if (toolTipEle.length && toolTipEle.length > 0) {
                        $(".ant-tooltip-arrow").css("display", "none");
                        $(".ant-tooltip-inner").css("color", getFontColor(this.minorColor)).addClass("poemFont");
                    }

                    // message
                    let messageEle = $(".ant-message");
                    if (messageEle.length && messageEle.length > 0) {
                        $(".ant-message-notice-content").css({
                            "backgroundColor": this.minorColor,
                            "color": getFontColor(this.minorColor),
                        }).addClass("poemFont");
                        $(".ant-message-custom-content > .anticon").css({
                            "color": getFontColor(this.minorColor),
                        });
                    }

                    // notification
                    let notificationEle = $(".ant-notification");
                    if (notificationEle.length && notificationEle.length > 0) {
                        $(".ant-notification-notice").css({"backgroundColor": this.minorColor});
                        $(".ant-notification-notice-icon").css("color", getFontColor(this.minorColor));
                        $(".ant-notification-notice-message").css("color", getFontColor(this.minorColor)).addClass("poemFont");
                        $(".ant-notification-notice-description").css("color", getFontColor(this.minorColor)).addClass("poemFont");
                    }

                    // drawer
                    let drawerEle = $(".ant-drawer");
                    if (drawerEle.length && drawerEle.length > 0) {
                        $(".ant-drawer-header").css({
                            "background-color": this.minorColor,
                            "border-bottom": "1px solid " + getFontColor(this.minorColor)
                        });
                        $(".ant-drawer-title").css("color", getFontColor(this.minorColor)).addClass("poemFont");
                        $(".ant-card-head").css({
                            "background-color": this.minorColor,
                            "border-bottom": "2px solid " + getFontColor(this.minorColor)
                        });
                        $(".ant-card-head-title").css("color", getFontColor(this.minorColor)).addClass("poemFont");
                        $(".ant-form-item-label > label").css("color", getFontColor(this.minorColor)).addClass("poemFont");
                        $(".ant-form-item-extra").css("color", getFontColor(this.minorColor)).addClass("poemFont");
                        $(".ant-radio-wrapper").children(":last-child").css("color", getFontColor(this.minorColor)).addClass("poemFont");
                        $(".ant-select-item").addClass("poemFont");
                        $(".ant-drawer-footer").css({"background-color": this.minorColor, "border-top": "1px solid " + getFontColor(this.minorColor)});

                        // menuPreferenceComponent
                        resetRadioColor(this.preferenceData.searchEngine, ["bing", "google"], this.majorColor);
                        resetRadioColor(this.preferenceData.buttonShape, ["round", "default"], this.majorColor);
                        resetRadioColor(this.preferenceData.poemTopic, poemTopics, this.majorColor);
                        resetRadioColor(this.preferenceData.fontFamily, ["cursive", "sansSerif"], this.majorColor);
                        resetRadioColor(this.preferenceData.fontVariant, ["simplified", "traditional"], this.majorColor);
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
                        }).addClass("poemFont");
                        $(".ant-modal-footer").css({
                            "backgroundColor": this.minorColor,
                            "border-color": this.minorColor
                        });
                        $(".ant-modal-footer > .ant-btn").css("color", getFontColor(this.minorColor)).addClass("poemFont")
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

                    // 设置字体(需要优化)
                    setFont(".poemFont", this.preferenceData);
                }
            });
        });
        observer.observe(document.body, {childList: true});
    }

    ngOnInit(): void {
        // 颜色主题
        this.setColorTheme();

        // 版本号提醒
        let currentVersion = require('../../package.json').version;
        let storageVersion = getExtensionStorage("SkyNewTabPoemAngularVersion", "0.0.0");
        if (storageVersion !== currentVersion) {
            this.notification.blank(
                "已更新至版本 V" + currentVersion,
                "详细内容请前往菜单栏更新日志查看",
                {nzPlacement: "bottomLeft", nzDuration: 5000, nzCloseIcon: "null"}
            );
            setExtensionStorage("SkyNewTabPoemAngularVersion", currentVersion);

            setTimeout(() => {
                this.notification.blank(
                    "支持作者",
                    "如果喜欢这款插件，请考虑五星好评",
                    {nzPlacement: "bottomLeft", nzDuration: 5000, nzCloseIcon: "null"}
                );
            }, 1000);

            // 额外提醒
            // if (currentVersion === "3.1.0") {
            //     setTimeout(() => {
            //         this.notification.blank(
            //             "重要通知",
            //             "本次更新修改了偏好设置中的切换间隔，如出现异常请点击重置设置按钮",
            //             {nzPlacement: "bottomLeft", nzDuration: 10000, nzCloseIcon: "null"}
            //         );
            //     }, 2000);
            // }
        }
    }

    protected readonly getFontColor = getFontColor;
}
