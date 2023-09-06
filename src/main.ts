import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));

// import {PopupModule} from './popupComponents/popup.module';
// platformBrowserDynamic().bootstrapModule(PopupModule)
//     .catch(err => console.error(err));