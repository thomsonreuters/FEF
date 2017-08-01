// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

// Specify which features of Angular we will require.
import { Routes, RouterModule }     from '@angular/router';

// Specify which features of our application we will require.
import { HomeComponent }            from './home/home.component';
import { FruitListComponent }       from './fruit-list/fruit-list.component';
import { FruitDetailComponent }     from './fruit-detail/fruit-detail.component';
import { FruitDetailResolver }      from './app.routing.resolver';

// Declare the static list of routes as a constant.
// Each route is mapped to a Component.
const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'fruit-list', component: FruitListComponent },

    // Note that this route expects an id value after the detail route, it also specifies that a resolver be used
    // during route activation. Note that the property name given to the resolve object becomes the property name on the
    // ActivatedRoute's snapshot.data property in the consuming Component.
    { path: 'fruit-detail/:id', component: FruitDetailComponent, resolve: {fruitItem: FruitDetailResolver } },

    // The Fruit Vendor Module is Lazy Loaded via the loadChildren property. Note that this is dependent on the WebPack angular-router-loader plugin.
    // NOTE: The fruit-vendor route is temporarily disabled as it is causing the AOT enging to blow during the prod build.
    // This appears to only happen on windows, and only with this particular version.
    // Uncomment the route below to enable this feature in dev.
    { path: 'fruit-vendor', loadChildren: './fruit-vendor/fruit-vendor.module#FruitVendorModule' },

    { path: '**', component: HomeComponent }
];

// Instatiate the router module and pass in the appRoutes configuration.
// Store the instantiated and configured module in an exported constant, so that the consuming App Module can simply import the constant,
// rather than be required to instantiate and configure it.  
export const appRouting = RouterModule.forRoot(appRoutes);