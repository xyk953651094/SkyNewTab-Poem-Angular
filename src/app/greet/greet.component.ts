import {Component, OnInit, Input} from '@angular/core';
import {getTimeDetails, getGreet, getSolarHoliday, getChineseHoliday} from "../../public/publicFunctions";
const $ = require('jquery');

@Component({
    selector: 'greet-component',
    templateUrl: './greet.component.html',
    styleUrls: ['./greet.component.css']
})
export class GreetComponent implements OnInit {
    @Input() fontColor: string = '#000000';
    title = 'GreetComponent';
    greetIcon = 'light_mode';
    greetContent: string = '你好';
    holidayContent: string = '无节气信息';

    // 问候
    setGreet(): void {
        let hours = new Date().getHours();
        if (hours >= 6 && hours < 18 ) {
            this.greetIcon = 'light_mode';
        }
        else {
            this.greetIcon = 'dark_mode';
        }

        this.greetContent = getGreet();
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
            success: function (result: any) {
                if (result.code === 1) {
                    if (result.data.solarTerms.indexOf("后") === -1) {
                        tempThis.holidayContent = "今日" + result.data.solarTerms;
                    } else {
                        tempThis.holidayContent = result.data.solarTerms;
                    }
                    tempThis.greetContent += "｜" + tempThis.holidayContent + " " + getSolarHoliday() + " " + getChineseHoliday(result.data.lunarCalendar);
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