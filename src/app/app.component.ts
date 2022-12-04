import { Component } from '@angular/core';
import { lightThemeArray, darkThemeArray } from "../public/publicConstants";
import { getFontColor } from "../public/publicFunctions";
const $ = require('jquery');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Sky诗词新标签页 Angular';
}

// 随机颜色主题
function setColorTheme() {
    let hour = new Date().getHours();
    let theme = lightThemeArray;  // 默认为亮色
    if (18 < hour || hour < 6) {
        theme = darkThemeArray;   // 夜间为暗色
    }
    let randomNum = Math.floor(Math.random() * theme.length);  // 随机选择

    $("body").css('background-color', theme[randomNum].bodyBackgroundColor);
    $(".poem-font").css({'color': theme[randomNum].fontColor});
}

setColorTheme();



