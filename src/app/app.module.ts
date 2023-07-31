import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {NzPopoverModule} from 'ng-zorro-antd/popover';
import {NzButtonModule} from 'ng-zorro-antd/button';

import {GreetComponent} from './greetComponent/greet.component';
import {WeatherComponent} from './weatherComponent/weather.component';
import {PoemComponent} from "./poemComponent/poem.component";
import {SunComponent} from "./sunComponent/sun.component";
import {WaveComponent} from "./waveComponent/wave.component";

registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,
        GreetComponent,
        WeatherComponent,
        PoemComponent,
        SunComponent,
        WaveComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NzLayoutModule,
        NzGridModule,
        NzButtonModule,
        NzPopoverModule,
        NzSpaceModule,
        NzIconModule,
        NzTypographyModule
    ],
    providers: [
        {provide: NZ_I18N, useValue: zh_CN}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
