import {Component, OnInit} from "@angular/core";
import {defaultPreferenceData, themeArray} from "../typescripts/publicConstants";
import {getFontColor} from "../typescripts/publicFunctions";
import {PreferenceDataInterface} from "../typescripts/publicInterface";

const $ = require("jquery");

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
    preferenceData: PreferenceDataInterface = defaultPreferenceData;

    constructor() {
    }

    getPreferenceData(value: PreferenceDataInterface) {
        this.preferenceData = value;
    }

    // 随机颜色主题
    setColorTheme() {
        // 随机颜色主题
        let theme: ({ majorColor: string, minorColor: string, svgColors: string[] }[]) = themeArray;
        let randomNum = Math.floor(Math.random() * theme.length);  // 随机选择
        localStorage.setItem("themeColor", JSON.stringify(themeArray[randomNum]));
        this.majorColor = theme[randomNum].majorColor;
        this.minorColor = theme[randomNum].minorColor;
        this.svgColors = theme[randomNum].svgColors;

        let bodyEle = $("body");
        bodyEle.css("background-color", theme[randomNum].majorColor);

        // 修改弹窗主题
        bodyEle.bind("DOMNodeInserted", () => {
            // 通用
            $(".ant-list-item:not(:last-child)").css("border-bottom", "1px solid " + getFontColor(this.minorColor));
            $(".ant-list-item-action").css("marginInlineStart", "0");
            $(".ant-empty-description").css({
                "color": getFontColor(this.minorColor),
                "font-family": "'Times New Roman', cursive, sans-serif",
            });
            $(".ant-alert").css("padding", "10px");

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
                $(".ant-radio-wrapper").children(":last-child").css({
                    "color": getFontColor(this.minorColor),
                    "font-family": "Times New Roman, cursive, sans-serif"
                });
                $(".ant-drawer-footer").css("background-color", this.minorColor);
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
                if(this.preferenceData.buttonShape === "round") {
                    $(".ant-modal-footer > .ant-btn").removeClass("ant-btn-default ant-btn-primary").addClass("poemFont ant-btn-round ant-btn-text");
                }
                else {
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
    }

    ngOnInit(): void {
        // 加载偏好设置
        let tempPreferenceData = localStorage.getItem("preferenceData");
        if (tempPreferenceData === null) {
            this.preferenceData = defaultPreferenceData
            localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
        } else {
            this.preferenceData = JSON.parse(tempPreferenceData);
        }

        // 颜色主题
        this.setColorTheme();
    }
}
