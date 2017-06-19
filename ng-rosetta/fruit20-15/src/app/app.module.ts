// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.
// See the project's LICENSE.MD for details. Copyright Thomson Reuters 2017. All rights reserved.

import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { UpgradeModule }  from '@angular/upgrade/static';

import { SampleComponent }  from './sample-component';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  declarations: [
    SampleComponent
  ],
  entryComponents: [
    SampleComponent
  ]
})

export class AppModule {
  public ngDoBootstrap() {}
}
