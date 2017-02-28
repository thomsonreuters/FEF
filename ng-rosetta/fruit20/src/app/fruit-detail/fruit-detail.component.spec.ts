// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormsModule }  from '@angular/forms';
import { ActivatedRoute }       from '@angular/router';

import { FruitDetailComponent } from './fruit-detail.component';
import { FruitItemImageComponent } from './fruit-image.component';

describe('FruitDetailComponent', () => {
    let comp: FruitDetailComponent;
    let fixture: ComponentFixture<FruitDetailComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    let activatedRouteRouteStub = {
        snapshot: {
            data: {
                fruitItem: {
                    id: 1,
                    common_name: "Strawberry Tree",
                    species: "Arbutus unedo",
                    region: "Mediteranian",
                    URL: "https://en.wikipedia.org/wiki/Arbutus_unedo",
                    ImageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bowl_of_Strawberry_Tree_berries.jpg/220px-Bowl_of_Strawberry_Tree_berries.jpg"
                }
            }
        }

    };

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],  
            declarations: [
                FruitDetailComponent,
                FruitItemImageComponent
            ],
            providers: [ {provide: ActivatedRoute, useValue: activatedRouteRouteStub}]
        })
        .compileComponents();
    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(FruitDetailComponent);

        comp = fixture.componentInstance;

        de = fixture.debugElement.query(By.css('h2'));
        el = de.nativeElement;

    });

    it('should display original title', () => {
        fixture.detectChanges();
        expect(el.textContent).toContain('Detail');
    });

});