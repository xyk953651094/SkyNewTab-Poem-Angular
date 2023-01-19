import { Component, Input, OnInit } from '@angular/core';
import {chinaWindowArray} from "../../public/publicConstants";
const $ = require('jquery');

@Component({
    selector: 'china-window-component',
    templateUrl: './chinaWindow.component.html',
    styleUrls: ['./chinaWindow.component.css']
})
export class ChinaWindowComponent implements OnInit {
    title = 'ChinaWindowComponent';
    chinaWindowIconClass: string = 'iconfont';
    @Input() fontColor: string = '#ffffff';

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

    ngOnInit(): void {
        this.setChinaWindow();
    }
}