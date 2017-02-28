// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

// Specify which features of Angular we will require.
import { Component } from '@angular/core';

// The custom image component consumes a targetUrl and an imageUrl property.
// It displays a clickable image that will navigate the user to the target url.
// Note that the targetUrl & imageUrl are specified as inputs on the component below.
// These values are supplied via declared Html bindings and consumed from the hosting component model. 
// They must also be declared in the component class to provide a place to store the values.
// Example usage:  <fruititem-image [targetUrl]="viewModel.target_url" [imageUrl]="viewModel.image_url"></fruititem-image>
// In the example above, the hosting Component is expected to have viewModel property, which possesses targetUrl and image_url properties.
@Component({
  selector: 'fruititem-image',
  template: `<div>
                <a href="{{targetUrl}}" target="new">
                    <img src="{{imageUrl}}">
                </a>
            </div>`,
    inputs: ['targetUrl', 'imageUrl']
})
export class FruitItemImageComponent {
    targetUrl: string;
    imageUrl: string
}