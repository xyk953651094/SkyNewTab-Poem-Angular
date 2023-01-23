import { Component, Input } from '@angular/core';

@Component({
    selector: 'mountain-component',
    templateUrl: './mountain.component.html',
    styleUrls: ['./mountain.component.css']
})
export class MountainComponent {
    title = 'MountainComponent';
    @Input() mountainColor: string[] = ['#ffffff', '#ffffff', '#ffffff'];
}