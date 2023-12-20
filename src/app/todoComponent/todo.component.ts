import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {NzMessageService} from 'ng-zorro-antd/message';
import {btnMouseOut, btnMouseOver, getFontColor, getTimeDetails} from "../../typescripts/publicFunctions";
import {NzButtonShape} from "ng-zorro-antd/button";

const $ = require("jquery");

@Component({
    selector: "todo-component",
    templateUrl: "./todo.component.html",
    styleUrls: ["./todo.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class todoComponent implements OnInit, OnChanges {
    @Input() majorColor: string = "#000000";
    @Input() minorColor: string = "#ffffff";
    @Input() preferenceData: any = {};
    title = "todoComponent";
    display: "block" | "none" = "block";
    displayModal: boolean = false;
    listItems: any = [];
    todoSize: number = 0;
    todoMaxSize: number = 5;
    tag: string = "工作";
    priority: string = "★";
    buttonShape: NzButtonShape = "round";
    protected readonly getFontColor = getFontColor;
    protected readonly getTimeDetails = getTimeDetails;
    protected readonly Date = Date;
    protected readonly btnMouseOver = btnMouseOver;
    protected readonly btnMouseOut = btnMouseOut;

    constructor(private message: NzMessageService) {
    }

    finishAllBtnOnClick() {
        let tempTodos = localStorage.getItem("todos");
        if (tempTodos) {
            localStorage.removeItem("todos");
            this.listItems = [];
            this.todoSize = 0;
        }
    }

    showAddModalBtnOnClick() {
        let todos = [];
        let tempTodos = localStorage.getItem("todos");
        if (tempTodos) {
            todos = JSON.parse(tempTodos);
        }
        if (todos.length < this.todoMaxSize) {
            // $("#todoInput").val("");
            this.displayModal = true;
            this.tag = "工作";
            this.priority = "★";
        } else {
            this.message.error("待办数量最多为" + this.todoMaxSize + "个");
        }
    }

    modalOkBtnOnClick() {
        let todoContent = $("#todoInput").val();
        if (todoContent && todoContent.length > 0) {
            let todos = [];
            let tempTodos = localStorage.getItem("todos");
            if (tempTodos) {
                todos = JSON.parse(tempTodos);
            }
            if (todos.length < this.todoMaxSize) {
                todos.push({
                    "title": todoContent,
                    "tag": this.tag,
                    "priority": this.priority,
                    "timeStamp": Date.now()
                });
                localStorage.setItem("todos", JSON.stringify(todos));
                this.displayModal = false;
                this.listItems = todos;
                this.todoSize = todos.length;

                this.message.success("添加成功");
            } else {
                this.message.error("待办数量最多为" + this.todoMaxSize + "个");
            }
        } else {
            this.message.error("表单不能为空");
        }
    }

    modalCancelBtnOnClick() {
        this.displayModal = false;
    }

    finishBtnOnClick(item: any) {
        let todos = [];
        let tempTodos = localStorage.getItem("todos");
        if (tempTodos) {
            todos = JSON.parse(tempTodos);
            let index = -1;
            for (let i = 0; i < todos.length; i++) {
                if (item.timeStamp === todos[i].timeStamp) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                todos.splice(index, 1);
            }
            localStorage.setItem("todos", JSON.stringify(todos));

            this.listItems = todos;
            this.todoSize = todos.length;
        }
    }

    selectOnChange(value: string) {
        let tempTag = "工作";
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
        this.buttonShape = this.preferenceData.buttonShape === "round" ? "circle" : null;

        let todos = [];
        let tempTodos = localStorage.getItem("todos");
        if (tempTodos) {
            todos = JSON.parse(tempTodos);
        }

        this.listItems = todos;
        this.todoSize = todos.length;
    }
}
