import {Component, OnInit, Input} from '@angular/core';
import {getTimeDetails, getGreetContent, getGreetIcon} from "../../public/publicFunctions";
const $ = require('jquery');

@Component({
    selector: 'greet-component',
    templateUrl: './greet.component.html',
    styleUrls: ['./greet.component.css']
})
export class GreetComponent implements OnInit {
    @Input() fontColor: string = '#000000';
    title = 'GreetComponent';
    greetIcon: string = '';
    greetContent: string = '你好';
    holidayContent: string = '无节气信息';

    // 问候
    setGreet(): void {
        this.greetIcon = getGreetIcon();
        this.greetContent = getGreetContent();
    }

    // 节气
    setHoliday(): void {
        let tempThis = this;
        let parameters = {
            "app_id": "cicgheqakgmpjclo",
            "app_secret": "RVlRVjZTYXVqeHB3WCtQUG5lM0h0UT09",
        };
        $.ajax({
            url: "https://www.mxnzp.com/api/holiday/single/" + getTimeDetails().showDate3,
            type: "GET",
            data: parameters,
            success: function (resultData: any) {
                if (resultData.code === 1) {
                    tempThis.holidayContent = resultData.data.solarTerms + " " + resultData.data.typeDes;
                    if (resultData.data.solarTerms.indexOf("后") === -1) {
                        tempThis.holidayContent = "今日" + tempThis.holidayContent;
                    }
                    tempThis.greetContent += "｜" + tempThis.holidayContent;
                }
            },
            error: function (err: any) {

            }
        })
    }

    ngOnInit(): void {
        this.setGreet();       // 问候
        this.setHoliday();     // 节气
    }
}