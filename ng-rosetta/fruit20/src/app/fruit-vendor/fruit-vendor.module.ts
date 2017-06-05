import { NgModule }             from '@angular/core';
import { RouterModule }         from '@angular/router';
import { FruitVendorComponent } from './fruit-vendor.component';

export const ROUTES = [
  { path: '', component: FruitVendorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  declarations: [FruitVendorComponent],
  bootstrap: [FruitVendorComponent]
})
export class FruitVendorModule {}
