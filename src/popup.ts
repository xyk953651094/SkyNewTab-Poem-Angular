import {PopupModule} from './popupComponents/popup.module';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

platformBrowserDynamic().bootstrapModule(PopupModule)
    .catch(err => console.error(err));