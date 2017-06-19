// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.
// See the project's LICENSE.MD for details. Copyright Thomson Reuters 2017. All rights reserved.

import { enableProdMode } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import { platformBrowser } from '@angular/platform-browser';

// Because the AOT process has been migrated to use the @ngtools/webpack plugin, and that plugin performs all AOT-related
// file operations in-memory, this file will never exist on disc and will always report as missing during design-time.
// During the production build (npm run build:prod), the factory file is generated prior to compiling this file.
import {AppModuleNgFactory} from './aot/src/app/app.module.ngfactory';

// Enable production mode.
enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory).then((platformRef) => {

  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;

  upgrade.bootstrap(document.body, ['fruit15'], { strictDi: true });

});
