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
        poemContent.load((result: any) => {
            // 限制显示字数
            // if (result.data.content.length > 30) {
            //     this.poemContent = result.data.content.slice(0, 30) + '...';
            // }
            // else {
            //     this.poemContent = result.data.content
            // }

            this.poemContent = '谁家今夜扁舟子，何处相思明月楼？谁家今夜扁舟子，何处相思明月楼？谁家今夜扁舟子，何处相思明月楼？'
            this.poemAuthor = '【' + result.data.origin.dynasty + '】' +
                result.data.origin.author + ' ·' +
                '《' + result.data.origin.title + '》'
        });
    }

    ngOnInit(): void {
        this.setPoem();
    }
}