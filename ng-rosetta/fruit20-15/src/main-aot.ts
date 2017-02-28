import { UpgradeModule }          from '@angular/upgrade/static'
import { AppModuleNgFactory }  from '../aot/discard_ts/src/js/ng2components/app.module.ngfactory';
import { platformBrowser } from '@angular/platform-browser';
import './js/components/app';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory).then(platformRef => {

  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;

  upgrade.bootstrap(document.body, ['fruit15'], { strictDi: true });
  
});