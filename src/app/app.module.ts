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
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from "ng-zorro-antd/input";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzRateModule} from 'ng-zorro-antd/rate';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzAlertModule} from 'ng-zorro-antd/alert';

import {SunComponent} from "./sunComponent/sun.component";
import {GreetComponent} from './greetComponent/greet.component';
import {WeatherComponent} from './weatherComponent/weather.component';
import {DailyComponent} from './dailyComponent/daily.component';
import {todoComponent} from "./todoComponent/todo.component";
import {PreferenceComponent} from './preferenceComponent/preference.component';
import {PoemComponent} from "./poemComponent/poem.component";
import {WaveComponent} from "./waveComponent/wave.component";

import {
    preferenceFunctionComponent
} from "../preferenceComponents/preferenceFunctionComponent/preferenceFunction.component";
import {preferenceEmailComponent} from "../preferenceComponents/preferenceEmailComponent/preferenceEmail.component";
import {preferenceInfoComponent} from "../preferenceComponents/preferenceInfoComponent/preferenceInfo.component";
import {preferenceLinkComponent} from "../preferenceComponents/preferenceLinkComponent/preferenceLink.component";
import {preferenceFooterComponent} from "../preferenceComponents/preferenceFooterComponent/preferenceFooter.component";
import {preferenceHeaderComponent} from "../preferenceComponents/preferenceHeaderComponent/preferenceHeader.component";

registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,
        SunComponent,
        GreetComponent,
        WeatherComponent,
        DailyComponent,
        todoComponent,
        PoemComponent,
        WaveComponent,
        PreferenceComponent,
        preferenceFooterComponent,
        preferenceEmailComponent,
        preferenceInfoComponent,
        preferenceLinkComponent,
        preferenceFunctionComponent,
        preferenceHeaderComponent
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
        NzTypographyModule,
        NzDatePickerModule,
        NzListModule,
        NzModalModule,
        NzFormModule,
        NzInputModule,
        NzDrawerModule,
        NzToolTipModule,
        NzCardModule,
        NzRadioModule,
        NzAvatarModule,
        NzSwitchModule,
        NzSelectModule,
        NzRateModule,
        NzEmptyModule,
        NzAlertModule
    ],
    providers: [
        {provide: NZ_I18N, useValue: zh_CN},
        {provide: NzMessageService}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
