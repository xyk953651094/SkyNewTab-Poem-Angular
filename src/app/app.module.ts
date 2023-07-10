import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {GreetComponent} from './greet/greet.component';
import {WeatherComponent} from "./weather/weather.component";
import {PoemComponent} from './poem/poem.component';
import {SunComponent} from "./sun/sun.component";
import {WaveComponent} from "./wave/wave.component";

import {MatGridListModule} from "@angular/material/grid-list";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
    declarations: [
        AppComponent,
        GreetComponent,
        WeatherComponent,
        PoemComponent,
        SunComponent,
        WaveComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatGridListModule,
        MatSlideToggleModule,
        MatListModule,
        MatInputModule,
        MatTooltipModule,
        MatIconModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
