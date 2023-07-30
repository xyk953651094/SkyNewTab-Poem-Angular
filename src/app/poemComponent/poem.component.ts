import {Component, Input, OnInit} from "@angular/core";
import {getFontColor} from "../../typescripts/publicFunctions";

const poemRequest = require("jinrishici");

@Component({
    selector: "poem-component",
    templateUrl: "./poem.component.html",
    styleUrls: ["./poem.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class PoemComponent implements OnInit {
    // constructor(private message: NzMessageService) {}

    title = "PoemComponent";
    @Input() fontColor: string = "#000000";
    poemContent: string = "海上生明月，天涯共此时。";
    poemAuthor: string = "张九龄";
    poemAuthorDetails: string = "【唐】张九龄 ·《望月怀远》"

    btnMouseOver(e: any) {
        e.currentTarget.style.backgroundColor = this.fontColor;
        e.currentTarget.style.color = getFontColor(this.fontColor);
    }

    btnMouseOut(e: any) {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = this.fontColor;
    }

    // 今日诗词
    setPoem(poemData: any) {
        this.poemContent = poemData.data.content;
        this.poemAuthor = poemData.data.origin.author;
        this.poemAuthorDetails = "【" + poemData.data.origin.dynasty + "】" +
            poemData.data.origin.author + " ·" +
            "《" + poemData.data.origin.title + "》"
    }

    getPoem() {
        poemRequest.load((result: any) => {
            localStorage.setItem("lastPoemRequestTime", String(new Date().getTime()));  // 保存请求时间，防抖节流
            localStorage.setItem("lastPoem", JSON.stringify(result));                   // 保存请求结果，防抖节流
            this.setPoem(result);
        });
    }

    poemContentBtnOnClick() {
        window.open("https://cn.bing.com/search?&q=" + this.poemContent, "_blank");
    }

    poemAuthorBtnOnClick() {
        window.open("https://cn.bing.com/search?&q=" + this.poemAuthor, "_blank");
    }

    ngOnInit(): void {
        // 防抖节流
        let lastPoemRequestTime: any = localStorage.getItem("lastPoemRequestTime");
        let nowTimeStamp = new Date().getTime();
        if (lastPoemRequestTime === null) {  // 第一次请求时 lastRequestTime 为 null，因此直接进行请求赋值 lastRequestTime
            this.getPoem();
        } else if (nowTimeStamp - parseInt(lastPoemRequestTime) > 60 * 1000) {  // 必须多于一分钟才能进行新的请求
            this.getPoem();
        } else {  // 一分钟之内使用上一次请求结果
            let lastPoem: any = localStorage.getItem("lastPoem");
            if (lastPoem) {
                lastPoem = JSON.parse(lastPoem);
                this.setPoem(lastPoem);
            } else {
                // this.message.error("获取诗词失败");
            }
        }
    }
}
