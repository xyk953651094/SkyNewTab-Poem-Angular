import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {NzMessageService} from 'ng-zorro-antd/message';
import {btnMouseOut, btnMouseOver, getFontColor} from "../../typescripts/publicFunctions";

@Component({
    selector: "todo-component",
    templateUrl: "./todo.component.html",
    styleUrls: ["./todo.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class TodoComponent implements OnInit, OnChanges {
    @Input() majorColor: string = "#000000";
    @Input() minorColor: string = "#ffffff";
    @Input() preferenceData: any = {};
    title = "TodoComponent";
    display: "block" | "none" = "block";
    displayModal: boolean = false;
    todoList: any = [];
    todoMaxSize: number = 10;
    inputValue: string = "";
    tag: string = "工作";
    priority: string = "★";
    protected readonly getFontColor = getFontColor;
    protected readonly btnMouseOver = btnMouseOver;
    protected readonly btnMouseOut = btnMouseOut;

    constructor(private message: NzMessageService) {}

    finishAllBtnOnClick() {
        this.todoList = [];
        localStorage.removeItem("todos");
    }

    finishBtnOnClick(item: any) {
        let index = -1;
        for (let i = 0; i < this.todoList.length; i++) {
            if (item.timeStamp === this.todoList[i].timeStamp) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            this.todoList.splice(index, 1);
        }

        this.todoList.sort((a: any, b: any) => {
            return b.priority.length - a.priority.length;
        });

        localStorage.setItem("todos", JSON.stringify(this.todoList));
    }

    showAddModalBtnOnClick() {
        if (this.todoList.length < this.todoMaxSize) {
            this.displayModal = true;
            this.inputValue = "";
            this.tag = "工作";
            this.priority = "★";
        } else {
            this.message.error("待办数量最多为" + this.todoMaxSize + "个");
        }
    }

    modalOkBtnOnClick() {
        if (this.inputValue && this.inputValue.length > 0 && this.inputValue.length <= 10) {
            this.todoList.push({
                "title": this.inputValue,
                "tag": this.tag,
                "priority": this.priority,
                "timeStamp": Date.now()
            });

            this.todoList.sort((a: any, b: any) => {
                return b.priority.length - a.priority.length;
            });

            this.displayModal = false;
            localStorage.setItem("todos", JSON.stringify(this.todoList));
            this.message.success("添加成功");
        } else if (this.inputValue && this.inputValue.length > 10) {
            this.message.error("待办事项名称不能超过10个字");
        } else {
            this.message.error("表单不能为空");
        }
    }

    modalCancelBtnOnClick() {
        this.displayModal = false;
    }

    selectOnChange(value: string) {
        let tempTag: string;
        switch (value) {
            case "work":
                tempTag = "工作";
                break;
            case "study":
                tempTag = "学习";
                break;
            case "life":
                tempTag = "生活";
                break;
            case "rest":
                tempTag = "休闲";
                break;
            case "other":
                tempTag = "其它";
                break;
            default:
                tempTag = "工作";
                break;
        }
        this.tag = tempTag;
    }

    rateOnChange(value: number) {
        this.priority = "★".repeat(value);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["preferenceData"]) {
            this.display = this.preferenceData.simpleMode ? "none" : "block";
        }
    }

    ngOnInit(): void {
        this.display = this.preferenceData.simpleMode ? "none" : "block";

        let tempTodos = localStorage.getItem("todos");
        if (tempTodos) {
            this.todoList = JSON.parse(tempTodos);
        }
    }
}
