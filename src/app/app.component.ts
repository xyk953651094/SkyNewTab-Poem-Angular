import {Component, OnInit} from "@angular/core";
import {themeArray} from "../typescripts/publicConstants";
import {getFontColor} from "../typescripts/publicFunctions";

const $ = require("jquery");

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    title = "云开诗词新标签页";
    majorColor = "#000000";
    minorColor: string = "#ffffff";
    svgColors: string[] = ["#ffffff", "#ffffff", "#ffffff", "#ffffff"];

    constructor() {
    }

    // 随机颜色主题
    setColorTheme() {
        // 随机颜色主题
        let theme: ({ majorColor: string, minorColor: string, svgColors: string[] }[]) = themeArray;
        let randomNum = Math.floor(Math.random() * theme.length);  // 随机选择
        this.majorColor = theme[randomNum].majorColor;
        this.minorColor = theme[randomNum].minorColor;
        this.svgColors = theme[randomNum].svgColors;

        let bodyEle = $("body");
        bodyEle.css("background-color", theme[randomNum].majorColor);

        // 修改弹窗主题
        bodyEle.bind("DOMNodeInserted", () => {
            // popover
            let popoverEle = $(".ant-popover");
            if (popoverEle.length && popoverEle.length > 0) {
                $(".ant-popover-arrow").css("display", "none");
                // $(".ant-popover-inner").css("box-shadow", "none");
                $(".ant-popover-inner").css("border-radius", "10px");
                $(".ant-popover-title").css({
                    "color": getFontColor(this.minorColor),
                    "font-family": "'Times New Roman', cursive, sans-serif",
                    "font-size": "20px",
                    "background-color": this.minorColor,
                    "border-color": this.minorColor,
                    "border-top-left-radius": "10px",
                    "border-top-right-radius": "10px"
                });
                $(".ant-popover-inner-content").css({
                    "color": getFontColor(this.minorColor),
                    "backgroundColor":  this.minorColor,
                    "border-bottom-left-radius": "10px",
                    "border-bottom-right-radius": "10px"
                });
            }
        });
    }

    ngOnInit(): void {
        this.setColorTheme();
    }
}
