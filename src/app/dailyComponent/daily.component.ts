import {Component, Input, OnInit, OnChanges, SimpleChanges} from "@angular/core";
import {NzMessageService} from 'ng-zorro-antd/message';
import {getFontColor, getSearchEngineDetail, getTimeDetails,} from "../../typescripts/publicFunctions";

const $ = require("jquery");

@Component({
    selector: "daily-component",
    templateUrl: "./daily.component.html",
    styleUrls: ["./daily.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class DailyComponent implements OnInit, OnChanges {
    @Input() majorColor: string = "#000000";
    @Input() minorColor: string = "#ffffff";
    @Input() preferenceData: any = {};
    title = "DailyComponent";
    display: "block" | "none" = "block";
    displayModal: boolean = false;
    listItems: any = [];
    dailySize: number = 0;
    dailyMaxSize: number = 5;
    selectedTimeStamp: number = 0;
    protected readonly getFontColor = getFontColor;
    protected readonly getTimeDetails = getTimeDetails;
    protected readonly Date = Date;

    constructor(private message: NzMessageService) {
    }

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.majorColor;
        e.currentTarget.style.color = getFontColor(this.majorColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = getFontColor(this.minorColor);
    }

    removeAllBtnOnClick() {
        let tempDaily = localStorage.getItem("daily");
        if (tempDaily) {
            localStorage.removeItem("daily");
            this.listItems = [];
            this.dailySize = 0;
        }
    }

    removeBtnOnClick(item: any) {
        let daily = [];
        let tempDaily = localStorage.getItem("daily");
        if (tempDaily) {
            daily = JSON.parse(tempDaily);
            let index = -1;
            for (let i = 0; i < daily.length; i++) {
                if (item.timeStamp === daily[i].timeStamp) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                daily.splice(index, 1);
            }
            localStorage.setItem("daily", JSON.stringify(daily));

            this.listItems = daily;
            this.dailySize = daily.length;
        }
    }

    showAddModalBtnOnClick() {
        let daily = [];
        let tempDaily = localStorage.getItem("daily");
        if (tempDaily) {
            daily = JSON.parse(tempDaily);
        }
        if (daily.length < this.dailyMaxSize) {
            // $("#dailyInput").val("");

            this.displayModal = true;
            this.selectedTimeStamp = 0;
        } else {
            this.message.error("倒数日数量最多为" + this.dailyMaxSize + "个");
        }
    }

    modalOkBtnOnClick() {
        let title = $("#dailyInput").val();
        let selectedDate = $("#dailyDatePicker").val();
        if (selectedDate) {
            this.selectedTimeStamp = new Date(selectedDate).getTime();
        } else {
            this.selectedTimeStamp = 0;
        }

        if (title && title.length > 0 && this.selectedTimeStamp !== 0) {
            let daily = [];
            let tempDaily = localStorage.getItem("daily");
            if (tempDaily) {
                daily = JSON.parse(tempDaily);
            }
            if (daily.length < this.dailyMaxSize) {
                daily.push({
                    "title": title,
                    "selectedTimeStamp": this.selectedTimeStamp,
                    "timeStamp": Date.now()
                });
                localStorage.setItem("daily", JSON.stringify(daily));

                this.displayModal = false;
                this.listItems = daily;
                this.dailySize = daily.length;

                this.message.success("添加成功");
            } else {
                this.message.error("倒数日数量最多为" + this.dailyMaxSize + "个");
            }
        } else {
            this.message.error("表单不能为空");
        }
    }

    // datePickerOnChange(result: Date) {
    //     if (result) {
    //         this.selectedTimeStamp = new Date(result).getTime();
    //     } else {
    //         this.selectedTimeStamp = 0;
    //     }
    // };

    modalCancelBtnOnClick() {
        this.displayModal = false
    }

    getDailyDescription(selectedTimeStamp: number) {
        let todayTimeStamp = new Date(getTimeDetails(new Date()).showDate5).getTime();
        let description;
        if (todayTimeStamp - selectedTimeStamp > 0) {
            description = "已过 " + ((todayTimeStamp - selectedTimeStamp) / 86400000) + " 天";
        } else if (todayTimeStamp - selectedTimeStamp === 0) {
            description = "就是今天";
        } else {
            description = "还剩 " + ((selectedTimeStamp - todayTimeStamp) / 86400000) + " 天";
        }
        return description;
    }

    getDate(value: string) {
        return new Date(value);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["preferenceData"]) {
            this.display = this.preferenceData.simpleMode ? "none" : "block";
        }
    }

    ngOnInit(): void {
        this.display = this.preferenceData.simpleMode ? "none" : "block"

        let daily = [];
        let tempDaily = localStorage.getItem("daily");
        if (tempDaily) {
            daily = JSON.parse(tempDaily);
        }
        this.listItems = daily;
        this.dailySize = daily.length;
    }
}
