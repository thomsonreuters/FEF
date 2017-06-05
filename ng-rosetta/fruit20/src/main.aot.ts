// Specify which features of Angular we will require.
import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

// Specify which features of our application we will require.
import {AppModuleNgFactory} from './aot/src/app/app.module.ngfactory';

// Enable production mode if specified by the configuration.
enableProdMode();

// Bootstrap our application.
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);