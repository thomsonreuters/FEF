// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.
// See the project's LICENSE.MD for details. Copyright Thomson Reuters 2017. All rights reserved.

// Specify which features of Angular we will require.
import { UpgradeModule }          from '@angular/upgrade/static';
import { AppModule }              from './app/app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic().bootstrapModule(AppModule).then((platformRef) => {

  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;

  upgrade.bootstrap(document.body, ['fruit15'], { strictDi: true });

});
