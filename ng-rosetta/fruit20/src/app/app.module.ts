// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

// Specify which features of Angular we will require.
import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';

// Specify which features of the NG-Bootstrap libarary we will require.
import { NgbModule }                  from '@ng-bootstrap/ng-bootstrap';

// Specify which features of application we will require.
import { appRouting }                 from './app.routing';
import { FruitDetailResolver }        from './app.routing.resolver';
import { AppComponent }               from './app.component';
import { HomeComponent }              from './home/home.component';
import { FruitListComponent }         from './fruit-list/fruit-list.component';
import { FruitDetailComponent }       from './fruit-detail/fruit-detail.component';
import { FruitItemImageComponent }    from './fruit-detail/fruit-image.component';
import { FruitService }               from './shared/fruit.service';
import { FruitImageCellComponent }    from './fruit-list/fruit-image-cell.component';

// The AppModule serves to combine our various comsponents, services and models into a discreet module.
// All required references are imported above, and then referenced as follows:
// imports: External modules that will be consumed by AppModule.
// declarations: Internal Components and Directives that will be consumed by the rendering engine.
// providers: Internal Services and Resolvers that will be consumed the the Dependency Injection engine.
// bootstrap: The Component to display first.
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpModule,
    appRouting
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    FruitListComponent,
    FruitDetailComponent,
    FruitItemImageComponent,
    FruitImageCellComponent
  ],
  providers: [
    FruitService,
    FruitDetailResolver
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}