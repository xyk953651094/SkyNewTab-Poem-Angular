import { Component, Input } from '@angular/core';

@Component({
    selector: 'sun-component',
    templateUrl: './sun.component.html',
    styleUrls: ['./sun.component.css']
})
export class SunComponent {
    title = 'SunComponent';
    @Input() fontColor: string = '#ffffff';
    @Input() sunColor: string[] = ['#ffffff', '#ffffff', '#ffffff'];
}