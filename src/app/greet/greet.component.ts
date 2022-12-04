import { Component } from '@angular/core';
import {getTimeDetails,getGreet} from "../../public/publicFunctions";
const $ = require('jquery');

@Component({
  selector: 'greet-component',
  templateUrl: './greet.component.html',
  styleUrls: ['./greet.component.css', '../app.component.css']
})
export class GreetComponent {
  title = 'GreetComponent';
}

// 问候
function setGreet() {
  let greetContent = getGreet();
  $('#greetSpan').html(greetContent);
}

// 节气
function setHoliday() {
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
        let solarTerms = result.data.solarTerms;
        if (result.data.solarTerms.indexOf("后") === -1) {
          solarTerms = "今日" + solarTerms;
        }
        $("#holidaySpan").html(solarTerms);
      }
    },
    error: function (err: any) {

    }
  })
}

// 天气
function setWeather() {
  $.ajax({
    url: "https://v2.jinrishici.com/info",
    type: "GET",
    success: function (result: any) {
      if (result.status === "success") {
        if (result.data.weatherData) {
          $("#weatherSpan").html(result.data.weatherData.weather);
        }
      } else {

      }
    },
    error: function (err: any) {

    }
  });
}

setGreet();       // 问候
setHoliday();     // 节气
setWeather();     // 天气
