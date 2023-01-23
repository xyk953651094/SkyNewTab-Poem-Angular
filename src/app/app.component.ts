import {Component, OnInit} from '@angular/core';
import {themeArray, chinaWindowArray, chinaObjectArray} from "../public/publicConstants";
import {getFontColor} from "../public/publicFunctions";

const $ = require('jquery');

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    constructor() {}
    title = 'Sky诗词新标签页 Angular';
    fontColor: string = '#ffffff';
    svgColor: string[] = ['#ffffff', '#ffffff', '#ffffff', '#ffffff'];

    // 随机颜色主题
    setColorTheme(): void {
        let theme: ({ bodyBackgroundColor: string, fontColor: string, svgColor: string[]}[]) = themeArray;
        let randomNum = Math.floor(Math.random() * theme.length);  // 随机选择
        $('body').css('background-color', theme[randomNum].bodyBackgroundColor);
        this.fontColor = theme[randomNum].fontColor;
        this.svgColor = theme[randomNum].svgColor;

        $("body").bind("DOMNodeInserted", () => {
            let popoverEle = $(".popover");
            if (popoverEle.length && popoverEle.length > 0) {
                popoverEle.css('cssText',
                    '--bs-popover-header-color:' + theme[randomNum].fontColor + '!important;' +
                    '--bs-popover-body-color:' + theme[randomNum].fontColor + '!important;' +
                    'font-family: cursive,SimSun, Arial, Helvetica, sans-serif !important;' +
                    'font-size: 18px;'
                );
            }

            let popoverHeader = $(".popover-header");
            if (popoverHeader.length && popoverHeader.length > 0) {
                popoverHeader.css('cssText',
                    'font-family: cursive,SimSun, Arial, Helvetica, sans-serif !important;' +
                    'font-size: 20px;'
                );
            }
        });
    }

    ngOnInit(): void {
        this.setColorTheme();
    }
}



