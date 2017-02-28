// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

import { NgModule, Component }  from '@angular/core';
import { RouterModule }         from '@angular/router';

@Component({
    selector: 'fruit-vendor',
    template: `<div style="background: tan;width: 500px;"><h1>Fruit Vendor Component</h1></div>`
})
class FruitVendorComponent {}

const ROUTES = [
  { path: '', component: FruitVendorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  declarations: [FruitVendorComponent],
  bootstrap: [FruitVendorComponent]
})
export class FruitVendorModule {}