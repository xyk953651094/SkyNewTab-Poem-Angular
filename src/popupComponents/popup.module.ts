import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

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

import {popupComponent} from "../app/popupComponent/popup.component";
import {popupHeaderComponent} from "./popupHeaderComponent/popupHeader.component";
import {popupStatusComponent} from "./popupStatusComponent/popupStatus.component";
import {popupObjectComponent} from "./popupObjectComponent/popupObject.component";
import {popupPoemComponent} from "./popupPoemComponent/popupPoem.component";
import {PopupWindowComponent} from "./popupWindowComponent/popupWindow.component";
import {popupFooterComponent} from "./popupFooterComponent/popupFooter.component";

registerLocaleData(zh);

@NgModule({
    declarations: [
        popupComponent,
        popupHeaderComponent,
        popupStatusComponent,
        popupObjectComponent,
        popupPoemComponent,
        PopupWindowComponent,
        popupFooterComponent,
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
        NzEmptyModule
    ],
    providers: [
        {provide: NZ_I18N, useValue: zh_CN},
        {provide: NzMessageService}
    ],
    bootstrap: [popupComponent]
})
export class PopupModule {
}
