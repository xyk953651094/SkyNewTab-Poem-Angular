import { Component, Input, OnInit } from '@angular/core';
import {chinaObjectArray, chinaWindowArray} from "../../public/publicConstants";
const $ = require('jquery');

@Component({
    selector: 'china-object-component',
    templateUrl: './chinaObject.component.html',
    styleUrls: ['./chinaObject.component.css']
})
export class ChinaObjectComponent implements OnInit {
    title = 'ChinaObjectComponent';
    chinaObjectIconClass: string = 'iconfont';
    @Input() fontColor: string = '#ffffff';

    setChinaObject(): void {
        let index = Math.floor((Math.random() * chinaObjectArray.length));
        let tempClassName = chinaObjectArray[index];
        this.chinaObjectIconClass += ' ' + tempClassName;
    }

    ngOnInit(): void {
        this.setChinaObject();
    }
}