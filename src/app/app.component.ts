import {Component, OnInit} from "@angular/core";
import {themeArray} from "../typescripts/publicConstants";
const $ = require("jquery");

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor() {}
  title = "云开诗词新标签页";
  fontColor: string = "#ffffff";
  svgColor: string[] = ["#ffffff", "#ffffff", "#ffffff", "#ffffff"];

  // 随机颜色主题
  setColorTheme(): void {
    let theme: ({ bodyBackgroundColor: string, fontColor: string, svgColor: string[]}[]) = themeArray;
    let randomNum = Math.floor(Math.random() * theme.length);  // 随机选择
    $("body").css("background-color", theme[randomNum].bodyBackgroundColor);
    this.fontColor = theme[randomNum].fontColor;
    this.svgColor = theme[randomNum].svgColor;

    $("body").bind("DOMNodeInserted", () => {
      // popover
      let popoverEle = $(".ant-popover");
      if (popoverEle.length && popoverEle.length > 0) {
        $(".ant-popover-arrow").css("display", "none");
        $(".ant-popover-inner").css("box-shadow", "none");
        $(".ant-popover-title").css({"color": this.fontColor, "font-family": "cursive, SimSun, Arial, Helvetica, sans-serif", "font-size": "20px", "background-color": theme[randomNum].bodyBackgroundColor, "border-color": "transparent"});
        $(".ant-popover-inner-content").css({"color": this.fontColor, "backgroundColor": theme[randomNum].bodyBackgroundColor});
      }
    });
  }

  ngOnInit(): void {
    this.setColorTheme();
  }
}
