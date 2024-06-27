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
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";

import {SunComponent} from "./sunComponent/sun.component";
import {SearchComponent} from "./searchComponent/search.component";
import {GreetComponent} from './greetComponent/greet.component';
import {WeatherComponent} from './weatherComponent/weather.component';
import {DailyComponent} from './dailyComponent/daily.component';
import {TodoComponent} from "./todoComponent/todo.component";
import {FocusComponent} from "./focusComponent/focus.component";
import {MenuComponent} from './menuComponent/menu.component';
import {ClockComponent} from "./clockComponent/clock.component";
import {PoemComponent} from "./poemComponent/poem.component";
import {WaveComponent} from "./waveComponent/wave.component";

import {menuPreferenceComponent} from "../menuComponents/menuPreferenceComponent/menuPreference.component";
import {menuContactComponent} from "../menuComponents/menuContactComponent/menuContact.component";
import {menuInfoComponent} from "../menuComponents/menuInfoComponent/menuInfo.component";
import {menuFooterComponent} from "../menuComponents/menuFooterComponent/menuFooter.component";
import {menuHeaderComponent} from "../menuComponents/menuHeaderComponent/menuHeader.component";
import {menuToTopComponent} from "../menuComponents/menuToTopComponent/menuToTop.component";

import {PopoverComponent} from "../publicComponent/popoverComponent/popover.component";
import {ButtonComponent} from "../publicComponent/buttonComponent/button.component";
import {ModalComponent} from "../publicComponent/modalComponent/modal.component";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzTimePickerModule} from "ng-zorro-antd/time-picker";
// import {NzColorPickerModule} from "ng-zorro-antd/color-picker";


registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,
        SunComponent,
        SearchComponent,
        GreetComponent,
        WeatherComponent,
        DailyComponent,
        TodoComponent,
        FocusComponent,
        ClockComponent,
        PoemComponent,
        WaveComponent,
        MenuComponent,
        menuFooterComponent,
        menuContactComponent,
        menuInfoComponent,
        menuPreferenceComponent,
        menuHeaderComponent,
        menuToTopComponent,

        ButtonComponent,
        ModalComponent,
        PopoverComponent,
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
        NzAlertModule,
        NzDividerModule,
        NzNotificationModule,
        NzCheckboxModule,
        NzUploadModule,
        NzTimePickerModule,
        // NzColorPickerModule
    ],
    providers: [
        {provide: NZ_I18N, useValue: zh_CN},
        {provide: NzMessageService}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
