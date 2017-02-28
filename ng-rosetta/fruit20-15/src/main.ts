import { UpgradeModule }          from '@angular/upgrade/static'
import { AppModule }              from './js/ng2components/app.module'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {

  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;

  upgrade.bootstrap(document.body, ['fruit15'], { strictDi: true });
  
});