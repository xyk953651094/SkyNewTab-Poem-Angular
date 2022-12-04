import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import bootstrap from 'bootstrap';
// const bootstrap = require('bootstrap');

import { AppComponent } from './app.component';
import { GreetComponent } from './greet/greet.component';
import { PoemComponent } from './poem/poem.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatGridListModule} from "@angular/material/grid-list";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {SearchComponent} from "./search/search.component";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    GreetComponent,
    PoemComponent,
    SearchComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatGridListModule,
        MatSlideToggleModule,
        MatListModule,
        MatInputModule,
        MatIconModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
