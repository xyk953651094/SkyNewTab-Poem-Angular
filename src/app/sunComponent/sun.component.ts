import {Component, Input} from "@angular/core";

@Component({
    selector: "sun-component",
    templateUrl: "./sun.component.html",
    styleUrls: ["./sun.component.scss"]
})
export class SunComponent {
    title = "SunComponent";
    @Input() sunColors: string[] = ["#ffffff", "#ffffff", "#ffffff"];
}
