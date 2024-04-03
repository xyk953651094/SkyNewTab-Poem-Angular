import { differenceInCalendarDays, setHours } from 'date-fns';
import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {NzMessageService} from 'ng-zorro-antd/message';
import {btnMouseOut, btnMouseOver, getFontColor, getTimeDetails, isEmpty} from "../../typescripts/publicFunctions";

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
    dailyList: any = [];
    dailyMaxSize: number = 10;
    inputValue: string = "";
    datePickerValue: Date = new Date();
    selectedTimeStamp: number = 0;
    dailySelectDisabled = false;
    loop = "";

    disabledDate = (current: Date): boolean => differenceInCalendarDays(current, new Date()) <= 0;

    protected readonly getFontColor = getFontColor;
    protected readonly getTimeDetails = getTimeDetails;
    protected readonly btnMouseOut = btnMouseOut;
    protected readonly btnMouseOver = btnMouseOver;

    constructor(private message: NzMessageService) {}

    removeAllBtnOnClick() {
        this.dailyList = [];
        localStorage.removeItem("daily");
    }

    removeBtnOnClick(item: any) {
        let index = -1;
        for (let i = 0; i < this.dailyList.length; i++) {
            if (item.timeStamp === this.dailyList[i].timeStamp) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            this.dailyList.splice(index, 1);
        }

        this.dailyList.sort((a: any, b: any) => {
            return a.selectedTimeStamp - b.selectedTimeStamp;
        });

        localStorage.setItem("daily", JSON.stringify(this.dailyList));
    }

    showAddModalBtnOnClick() {
        if (this.dailyList.length < this.dailyMaxSize) {
            this.displayModal = true;
            this.inputValue = "";
            this.datePickerValue = new Date();
            this.selectedTimeStamp = 0;
        } else {
            this.message.error("倒数日数量最多为" + this.dailyMaxSize + "个");
        }
    }

    modalOkBtnOnClick() {
        let selectedDate = getTimeDetails(this.datePickerValue).showDate5;
        if (selectedDate) {
            this.selectedTimeStamp = new Date(selectedDate).getTime();
        } else {
            this.selectedTimeStamp = 0;
        }

        if (this.inputValue && this.inputValue.length > 0 && this.inputValue.length <= 10 && this.selectedTimeStamp !== 0) {
            this.dailyList.push({
                "title": this.inputValue,
                "selectedTimeStamp": this.selectedTimeStamp,
                "loop": this.loop,
                "timeStamp": Date.now()
            });

            this.dailyList.sort((a: any, b: any) => {
                return a.selectedTimeStamp - b.selectedTimeStamp;
            });

            this.displayModal = false;
            localStorage.setItem("daily", JSON.stringify(this.dailyList));
            this.message.success("添加成功");
        } else if (this.inputValue && this.inputValue.length > 10) {
            this.message.error("倒数日名称不能超过10个字");
        } else {
            this.message.error("表单不能为空");
        }
    }

    modalCancelBtnOnClick() {
        this.displayModal = false
    }

    datePickerOnOpenChange(status: boolean) {
        // 关闭时
        if (!status) {
            if ([29, 30, 31].indexOf(new Date(this.datePickerValue).getDate()) !== -1) {
                this.dailySelectDisabled = true;
                this.loop = "";
            } else {
                this.dailySelectDisabled = false;
            }
        }
    }

    selectOnChange(value: string) {
        let tempLoop;
        switch (value) {
            case "noLoop":
                tempLoop = "";
                break;
            case "everyWeek":
                tempLoop = "每周";
                break;
            case "everyMonth":
                tempLoop = "每月";
                break;
            case "everyYear":
                tempLoop = "每年";
                break;
            default:
                tempLoop = "";
                break;
        }
        this.loop = tempLoop;
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

        let tempDailyList = [];
        let dailyListStorage = localStorage.getItem("daily");
        if (dailyListStorage) {
            tempDailyList = JSON.parse(dailyListStorage);

            // 更新循环倒数日
            let tempDailyListModified = false;
            tempDailyList.map((value: any) => {
                let tempValue = value;
                if (!isEmpty(value.loop)) {
                    let todayTimeStamp = new Date(getTimeDetails(new Date()).showDate5).getTime();
                    if (value.selectedTimeStamp < todayTimeStamp) {
                        tempDailyListModified = true;
                        switch (value.loop) {
                            case "每周":
                                value.selectedTimeStamp += 604800000;
                                break;
                            case "每月": {
                                let loopYear: string | number = new Date(value.selectedTimeStamp).getFullYear();
                                let loopMonth: string | number = new Date(value.selectedTimeStamp).getMonth() + 1;
                                let loopDate: string | number = new Date(value.selectedTimeStamp).getDate();

                                let nextLoopYear: string | number = loopYear;
                                let nextLoopMonth: string | number = loopMonth + 1;
                                if (loopMonth === 12) {
                                    nextLoopYear += 1;
                                    nextLoopMonth = 1;
                                }

                                nextLoopYear = nextLoopYear.toString();
                                nextLoopMonth = nextLoopMonth < 10 ? ("0" + nextLoopMonth) : nextLoopMonth.toString();
                                loopDate = loopDate < 10 ? ("0" + loopDate) : loopDate.toString();

                                let nextLoopString = nextLoopYear.toString() + "-" + nextLoopMonth.toString() + "-" + loopDate.toString();
                                value.selectedTimeStamp = new Date(nextLoopString).getTime();
                                break;
                            }
                            case "每年": {
                                let nextLoopYear: string | number = new Date(value.selectedTimeStamp).getFullYear() + 1;
                                let loopMonth: string | number = new Date(value.selectedTimeStamp).getMonth() + 1;
                                let loopDate: string | number = new Date(value.selectedTimeStamp).getDate();

                                nextLoopYear = nextLoopYear.toString();
                                loopMonth = loopMonth < 10 ? ("0" + loopMonth) : loopMonth.toString();
                                loopDate = loopDate < 10 ? ("0" + loopDate) : loopDate.toString();

                                let nextLoopString = nextLoopYear.toString() + "-" + loopMonth.toString() + "-" + loopDate.toString();
                                value.selectedTimeStamp = new Date(nextLoopString).getTime();
                                break;
                            }
                        }
                    }
                }
                return tempValue;
            });

            if (tempDailyListModified) {
                tempDailyList.sort((a: any, b: any) => {
                    return a.selectedTimeStamp - b.selectedTimeStamp;
                });
                localStorage.setItem("daily", JSON.stringify(tempDailyList));
            }
        }

        this.dailyList = tempDailyList;
    }

    protected readonly isEmpty = isEmpty;
}
