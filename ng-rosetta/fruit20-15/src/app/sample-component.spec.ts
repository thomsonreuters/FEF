// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.
// See the project's LICENSE.MD for details. Copyright Thomson Reuters 2017. All rights reserved.

import { 
    async, 
    ComponentFixture, 
    TestBed }                           from '@angular/core/testing';
import { 
    BrowserDynamicTestingModule, 
    platformBrowserDynamicTesting }     from '@angular/platform-browser-dynamic/testing';
import { By }                           from '@angular/platform-browser';
import { DebugElement }                 from '@angular/core';
import { FormsModule }                  from '@angular/forms';
import { RouterTestingModule }          from '@angular/router/testing';

import { SampleComponent }              from './sample-component';

describe('SampleComponent', () => {
    let comp: SampleComponent;
    let fixture: ComponentFixture<SampleComponent>;
    let de: DebugElement;
    let el: HTMLElement;


    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                RouterTestingModule
            ],  
            declarations: [SampleComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(SampleComponent);

        comp = fixture.componentInstance;

        de = fixture.debugElement.query(By.css('div'));
        el = de.nativeElement;

    });

    it('should display original title', () => {
        fixture.detectChanges();
        expect(el.innerText).toContain('Sample');
    });

});