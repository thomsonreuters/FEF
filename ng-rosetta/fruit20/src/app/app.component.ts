// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

// Specify which features of Angular we will require.
import { Component } from '@angular/core';

// The AppComponent is our starting component in the application.
// In this application, it only serves to host the routing viewport.
// All other content is contained in the various routes.
@Component({
  selector: 'my-app',
  template: `
    <main>
      <h1>ng-rosetta: Angular 2 Version</h1>

      <!-- Routing Viewport -->
      <router-outlet></router-outlet>
    </main>
    `
})
export class AppComponent {}