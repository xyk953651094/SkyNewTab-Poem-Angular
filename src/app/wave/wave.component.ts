import { Component, Input } from '@angular/core';

@Component({
    selector: 'wave-component',
    templateUrl: './wave.component.html',
    styleUrls: ['./wave.component.css']
})
export class WaveComponent {
    title = 'WaveComponent';
    @Input() waveColor: string[] = ['#ffffff', '#ffffff', '#ffffff'];
}