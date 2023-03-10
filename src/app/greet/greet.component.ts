import {Component, OnInit, Input} from '@angular/core';
import {httpRequest, getTimeDetails, getGreetContent, getGreetIcon} from "../../public/publicFunctions";
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

    // 请求完成后处理步骤
    setHoliday(data: any): void {
        this.holidayContent = data.solarTerms + " · " + data.typeDes;
        if (data.solarTerms.indexOf("后") === -1) {
            this.holidayContent = "今日" + this.holidayContent;
        }
        let timeDetails = getTimeDetails();
        this.calendar = timeDetails.showDate4 + " " + timeDetails.showWeek + "｜" + data.yearTips + data.chineseZodiac + "年｜" + data.lunarCalendar;
        this.suit = data.suit.replace(/\./g, " · ");
        this.avoid = data.avoid.replace(/\./g, " · ");

        // 更新 popover
        let contentHtml =
            "<div>" +
            "<p><i class='bi bi-check-circle'></i> 宜：" + this.suit + "</p>" +
            "<p><i class='bi bi-x-circle'></i> 忌：" + this.avoid + "</p>" +
            "</div>"

        let greetP = $('#greetP');
        let popover = new bootstrap.Popover(greetP, {
            html: true,
            title: this.calendar,
            content: contentHtml,
            placement: 'bottom',
            offset: "40, 10"
        })

        greetP.on('shown.bs.popover', function() {
            popover.update();
            popover.setContent();
        })
    }

    // 节气
    getHoliday(): void {
        let tempThis = this;
        let url = "https://www.mxnzp.com/api/holiday/single/" + getTimeDetails().showDate3;
        let data = {
            "app_id": "cicgheqakgmpjclo",
            "app_secret": "RVlRVjZTYXVqeHB3WCtQUG5lM0h0UT09",
        };
        httpRequest(url, data, "GET")
            .then(function(resultData: any){
                localStorage.setItem("lastHolidayRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
                if (resultData.code === 1) {
                    localStorage.setItem("lastHoliday", JSON.stringify(resultData.data));      // 保存请求结果，防抖节流
                    tempThis.setHoliday(resultData.data);
                }
            })
            .catch(function(){
                // 请求失败也更新请求时间，防止超时后无信息可显示
                localStorage.setItem("lastHolidayRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
            });
    }

    ngOnInit(): void {
        // 问候
        this.setGreet();

        // 节气，防抖节流
        let lastRequestTime: any = localStorage.getItem("lastHolidayRequestTime");
        let nowTimeStamp = new Date().getTime();
        if(lastRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
            this.getHoliday();
        }
        else if(nowTimeStamp - parseInt(lastRequestTime) > 60 * 60 * 1000) {  // 必须多于一小时才能进行新的请求
            this.getHoliday();
        }
        else {  // 一小时之内使用上一次请求结果
            let lastHoliday: any = localStorage.getItem("lastHoliday");
            if (lastHoliday) {
                lastHoliday = JSON.parse(lastHoliday);
                this.setHoliday(lastHoliday);
            }
        }
    }
}