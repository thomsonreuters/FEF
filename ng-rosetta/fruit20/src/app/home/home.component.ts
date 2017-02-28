// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

// Specify which features of Angular we will require.
import { Component }    from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { Router }       from '@angular/router';

// The home component simulates a login page. 
// It will collect a user name and password, but there is currently no validation logic
// and the values supplied by the form are not used anywhere.
// Clicking login will navigate the application to the list route.
@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
    // Declare any properties to be consumed by the binding engine.
    userName: string = 'JohnS';
    password: string = 'password';

    // Create an instance of the router service.
    constructor(private router: Router) {}

    // Navigate to the list route.
    login(): void {
        
        // Normally, we'd pass the credentials to an authentication service before proceeding.
        // This could be done in the resolver of the next route, or as part of the login process here.
        this.router.navigate(['fruit-list']);
    }
}