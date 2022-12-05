import {Component, OnInit} from '@angular/core';
import {lightThemeArray, darkThemeArray, chinaWindowArray, chinaObjectArray} from "../public/publicConstants";
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
    fontColor: string = '#ffffff';  // 默认为黑色
    chinaWindowIconClass: string = 'iconfont';
    chinaObjectIconClass: string = 'iconfont';

    // 随机颜色主题
    setColorTheme(): void {
        let hour = new Date().getHours();
        let theme = lightThemeArray;  // 默认为亮色
        if (18 < hour || hour < 6) {
            theme = darkThemeArray;   // 夜间为暗色
        }
        let randomNum = Math.floor(Math.random() * theme.length);  // 随机选择
        this.fontColor = theme[randomNum].fontColor;
        $("body").css('background-color', theme[randomNum].bodyBackgroundColor);
    }

    // 中国传统窗体
    setChinaWindow(): void {
        let index = Math.floor((Math.random() * chinaWindowArray.length));
        let tempClassName = chinaWindowArray[index];
        this.chinaWindowIconClass += ' ' + tempClassName;

        // 调整窗体显示效果
        let chinaWindowIcon = $("#chinaWindowIcon");
        if(tempClassName === "icon-chuangge2" || tempClassName === "icon-chuangge4"){
            chinaWindowIcon.css("transform", "rotate(90deg)");
        }
        if(tempClassName === "icon-chuangge6" || tempClassName === "icon-chuangge8"){
            chinaWindowIcon.css("transform", "rotate(45deg) scale(0.7)");
        }
    }
    
    setChinaObject(): void {
        let index = Math.floor((Math.random() * chinaObjectArray.length));
        let tempClassName = chinaObjectArray[index];
        this.chinaObjectIconClass += ' ' + tempClassName;
    }

    ngOnInit(): void {
        this.setColorTheme();
        this.setChinaWindow();
        this.setChinaObject();
    }
}



