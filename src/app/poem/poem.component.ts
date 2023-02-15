import { Component, OnInit, Input } from '@angular/core';
const poemContent = require('jinrishici');
const $ = require('jquery');

@Component({
    selector: 'poem-component',
    templateUrl: './poem.component.html',
    styleUrls: ['./poem.component.css']
})

export class PoemComponent implements OnInit{
    title = 'PoemComponent';
    @Input() fontColor: string = '#000000';
    poemContent: string = '海上生明月，天涯共此时';
    poemAuthor: string = '【唐】张九龄 ·《望月怀远》';

    // 今日诗词
    setPoem(): void {
        // this.poemContent = "人生代代无穷矣，江月年年望相似。人生代代无穷矣，江月年年望相似。人生代代无穷矣，江月年年望相似。"

        poemContent.load((result: any) => {
            this.poemContent = result.data.content;
            this.poemAuthor = '【' + result.data.origin.dynasty + '】' +
                result.data.origin.author + ' ·' +
                '《' + result.data.origin.title + '》'
        });
    }

    ngOnInit(): void {
        this.setPoem();
    }
}