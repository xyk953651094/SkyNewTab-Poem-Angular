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
    waveColor: string[] = ['#ffffff', '#ffffff', '#ffffff'];

    // 随机颜色主题
    setColorTheme(): void {
        let theme: ({ bodyBackgroundColor: string; fontColor: string; waveColor: string[] }[]) = themeArray;  // 默认为亮色
        let randomNum = Math.floor(Math.random() * theme.length);  // 随机选择
        $("body").css('background-color', theme[randomNum].bodyBackgroundColor);
        this.fontColor = theme[randomNum].fontColor;
        this.waveColor = theme[randomNum].waveColor;
    }

    ngOnInit(): void {
        this.setColorTheme();
    }
}



