// 根据颜色获取反色
export function getThemeColor(color: string) {
    color = "0x" + color.replace("#", '');
    let newColor = "000000" + (0xFFFFFF - parseInt(color)).toString(16);
    return "#" + newColor.substring(newColor.length-6, newColor.length);
}

// 根据背景颜色改变字体颜色效果
export function getFontColor(color: string) {
    let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    if (rgb) {
        let r = parseInt(rgb[1], 16);
        let g = parseInt(rgb[2], 16);
        let b = parseInt(rgb[3], 16);
        let gray = Math.round(r * 0.299 + g * 0.587 + b * 0.114);
        if (gray > 128) {
            return "#000000";
        } else {
            return "#ffffff";
        }
    }
    else {
        return "#ffffff";
    }
}

// 判断设备型号
export function deviceModel() {
    let ua = navigator.userAgent;
    if(ua.indexOf('iPhone') > -1) { return 'iPhone' }
    else if(ua.indexOf('iPad') > -1) { return 'iPad' }
    else if(ua.indexOf('Android') > -1) { return 'Android' }
    else { return '' }
}

export function getTimeDetails() {
    let param = new Date();
    let year: string | number = param.getFullYear();
    let month: string | number = param.getMonth() + 1;
    let day: string | number = param.getDate();
    let hour: string | number = param.getHours();
    let minute: string | number = param.getMinutes();
    let second: string | number = param.getSeconds();
    let week: string | number = param.getDay() + 1;
    let localeDate: string = param.toLocaleString("zh-Hans-u-ca-chinese");

    year = year.toString();
    month = month < 10? ("0" + month) : month.toString();
    day = day < 10? ("0" + day) : day.toString();
    hour = hour < 10? ("0" + hour) : hour.toString();
    minute = minute < 10? ("0" + minute) : minute.toString();
    second = second < 10? ("0" + second) : second.toString();
    switch (week) {
        case 0: week = "周日"; break;
        case 1: week = "周一"; break;
        case 2: week = "周二"; break;
        case 3: week = "周三"; break;
        case 4: week = "周四"; break;
        case 5: week = "周五"; break;
        case 6: week = "周六"; break;
        default: week = "";
    }

    return {
        year:year, month:month, day:day, hour:hour, minute:minute, second:second,
        showWeek: week,
        showDate: year + "/" + month + "/" + day,
        showDate2: year + "." + month + "." + day,
        showDate3: year + month + day,
        showDate4: year + "年" + month + "月" + day + "日",
        showTime: hour + ":" + minute,
        showLocaleDate: "农历" + localeDate.split(" ")[0] + "日"
    };
}

// 获取问候
export function getGreet() {
    let now = new Date();
    let hour = now.getHours();
    const greets = {
        morning: "朝霞满",
        noon: "正当午",
        afternoon: "斜阳下",
        evening: "日暮里",
        night: "见星辰",
        daybreak: "又一宿"
    };

    if (hour >=0 && hour < 6) {          // 凌晨
        return greets.daybreak;
    }
    else if (hour >= 6 && hour < 11) {   // 上午
        return greets.morning;
    }
    else if (hour >= 11 && hour < 14) {  // 中午
        return greets.noon;
    }
    else if (hour >= 14 && hour < 17) {  // 下午
        return greets.afternoon;
    }
    else if (hour >=17 && hour < 20) {   // 傍晚
        return greets.evening;
    }
    else {                               // 夜晚
        return greets.night;
    }
}

// 获取阳历节日
export function getSolarHoliday(): string {
    let today = new Date();
    let month: number = today.getMonth();
    let day: number = today.getDate();
    if (month === 1 && day === 1) { return "｜元旦节" }
    else if (month === 3 && day === 8) { return "｜妇女节"}
    else if (month === 4 && day === 5) { return "｜清明节"}
    else if (month === 5 && day === 1) { return "｜劳动节"}
    else if (month === 5 && day === 4) { return "｜青年节"}
    else if (month === 6 && day === 1) { return "｜儿童节"}
    else if (month === 8 && day === 1) { return "｜建军节"}
    else if (month === 10 && day === 1) { return "｜国庆节"}
    else return "";
}

// 获取农历节日
export function getChineseHoliday(today: string): string {
    if (today === "正月初一") { return "｜春节"}
    else if (today === "正月十五") { return "｜元宵节"}
    else if (today === "二月初二") { return "｜龙抬头"}
    else if (today === "五月初五") { return "｜端午节"}
    else if (today === "七月初七") { return "｜七夕节"}
    else if (today === "七月十五") { return "｜中元节"}
    else if (today === "八月十五") { return "｜中秋节"}
    else if (today === "九月初九") { return "｜重阳节"}
    else if (today === "腊月初八") { return "｜腊八节"}
    else if (today === "腊月廿四") { return "｜小年"}
    else if (today === "腊月三十") { return "｜除夕"}
    else return ""
}