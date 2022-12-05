import {Component, OnInit, Input} from '@angular/core';
import {getTimeDetails, getGreet} from "../../public/publicFunctions";
const $ = require('jquery');

@Component({
    selector: 'greet-component',
    templateUrl: './greet.component.html',
    styleUrls: ['./greet.component.css', '../app.component.css']
})
export class GreetComponent implements OnInit {
    @Input() fontColor: string = 'black';
    title = 'GreetComponent';
    greetContent: string = '你好';
    holidayContent: string = '暂无节日信息';
    weatherContent: string = '暂无天气信息';

    // 问候
    setGreet(): void {
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
                }
            },
            error: function (err: any) {

            }
        })
    }

    // 天气
    setWeather(): void {
        let tempThis = this;
        $.ajax({
            url: "https://v2.jinrishici.com/info",
            type: "GET",
            success: function (result: any) {
                if (result.status === "success") {
                    if (result.data.weatherData) {
                        tempThis.weatherContent = result.data.weatherData.weather;
                    }
                } else {

                }
            },
            error: function (err: any) {

            }
        });
    }

    ngOnInit(): void {
        this.setGreet();       // 问候
        this.setHoliday();     // 节气
        this.setWeather();     // 天气
    }
}