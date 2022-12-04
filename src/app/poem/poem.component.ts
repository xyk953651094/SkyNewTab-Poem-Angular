import { Component } from '@angular/core';
const poemContent = require('jinrishici');
const $ = require('jquery');

@Component({
    selector: 'poem-component',
    templateUrl: './poem.component.html',
    styleUrls: ['./poem.component.css', '../app.component.css']
})

export class PoemComponent {
    title = 'PoemComponent';
}

// 今日诗词
poemContent.load((result: any) => {
    $('#poemContent').html(result.data.content);
    $('#poemAuthor').html("【" + result.data.origin.dynasty + "】" +
        result.data.origin.author + " ·" +
        "《" + result.data.origin.title + "》");
});