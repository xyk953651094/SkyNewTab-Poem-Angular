import {Component, Input} from "@angular/core";

@Component({
    selector: "wave-component",
    templateUrl: "./wave.component.html",
    styleUrls: ["./wave.component.scss"]
})
export class WaveComponent {
    title = "WaveComponent";
    @Input() waveColors: string[] = ["#ffffff", "#ffffff", "#ffffff"];
}
