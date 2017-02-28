// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.


import { Component }            from '@angular/core';

@Component({
    selector: 'fruit-image-cell',
    template: `<img src="{{params.value}}" style="width:90px;height:90px;" />`
})
export class FruitImageCellComponent {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }
}