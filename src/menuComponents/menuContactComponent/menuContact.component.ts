import {Component, Input, OnInit} from "@angular/core";
import {btnMouseOut, btnMouseOver, getFontColor} from "../../typescripts/publicFunctions";
import {defaultPreferenceData} from "../../typescripts/publicConstants";

@Component({
    selector: "menuEmail-component",
    templateUrl: "./menuContact.component.html",
    styleUrls: ["./menuContact.component.scss", "../../stylesheets/publicStyles.scss"]
})
export class menuContactComponent implements OnInit {
    @Input() majorColor: string = "#ffffff";
    @Input() minorColor: string = "#000000";
    @Input() preferenceData = defaultPreferenceData;
    title = "menuContactComponent";
    protected readonly getFontColor = getFontColor;
    protected readonly btnMouseOver = btnMouseOver;
    protected readonly btnMouseOut = btnMouseOut;

    suggestBtnOnClick() {
        window.open("mailto:xyk953651094@qq.com?&subject=云开诗词新标签页-功能建议&body=提示：功能建议前请优先查阅帮助文档", "_self");
    }

    issueBtnOnClick() {
        window.open("mailto:xyk953651094@qq.com?&subject=云开诗词新标签页-问题反馈&body=提示：问题反馈前请优先查阅帮助文档", "_self");
    }

    homeBtnOnClick(value: string) {
        window.open("https://" + value + ".com/xyk953651094/", "_self");
    }

    moreBtnOnClick(value: string) {
        switch (value) {
            case "github":
                window.open("https://github.com/xyk953651094?tab=repositories/", "_self");
                break;
            case "gitlab":
                window.open("https://gitlab.com/users/xyk953651094/projects/", "_self");
                break;
        }
    }

    ngOnInit(): void {}
}
