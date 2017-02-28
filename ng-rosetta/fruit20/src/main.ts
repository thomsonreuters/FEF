// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

// Specify which features of Angular we will require.
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Specify which features of our application we will require.
import { AppModule } from './app/app.module'

// Bootstrap our application.
platformBrowserDynamic().bootstrapModule(AppModule);
