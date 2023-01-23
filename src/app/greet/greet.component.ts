import {Component, OnInit, Input} from '@angular/core';
import {getTimeDetails, getGreetContent, getGreetIcon} from "../../public/publicFunctions";
const bootstrap = require('bootstrap');
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
    calendar: string = '暂无日历信息';
    suit: string = '';
    avoid: string = '';

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
                    tempThis.holidayContent = resultData.data.solarTerms + " · " + resultData.data.typeDes;
                    if (resultData.data.solarTerms.indexOf("后") === -1) {
                        tempThis.holidayContent = "今日" + tempThis.holidayContent;
                    }
                    let timeDetails = getTimeDetails();
                    tempThis.calendar = timeDetails.showDate4 + " " + timeDetails.showWeek + "｜" + resultData.data.yearTips + resultData.data.chineseZodiac + "年｜" + resultData.data.lunarCalendar;
                    tempThis.suit = resultData.data.suit.replace(/\./g, " · ");
                    tempThis.avoid = resultData.data.avoid.replace(/\./g, " · ");

                    // 更新 popover
                    let contentHtml =
                        "<div>" +
                            "<p><i class=\"bi bi-check-circle\"></i> 宜：" + tempThis.suit + "</p>" +
                            "<p><i class=\"bi bi-x-circle\"></i> 忌：" + tempThis.avoid + "</p>" +
                        "</div>"

                    let greetP = $('#greetP');
                    let popover = new bootstrap.Popover(greetP, {
                        html: true,
                        title: tempThis.calendar,
                        content: contentHtml,
                        offset: "200, 10"
                    })

                    greetP.on('shown.bs.popover', function() {
                        popover.update();
                        popover.setContent();
                    })
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