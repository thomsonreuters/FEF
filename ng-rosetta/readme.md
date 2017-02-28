# NG-Rosetta Project

## Overview
This series of projects has been a labor of love for the past 6 months or so. It originally started as a presentation for a series of internal conferences and was built to demonstrate the various changes requred to evolve an AngularJS Application to Angular.

The end result is four seperate projects, each representing a different stage in the evolution and (hopefully) using the best practices for the target Angular version.

The four projects are detailed below: 
## Fruit1X (Angular 1.4.9 Project)
A pre-Angular1.5 Component Pattern application that uses the traditional Controller/Template pattern.

Specifics and features of this project are:
* Written in TypeScript and using Typings
* Uses ui-router for routing
* Demonstrates the usage of Angular Factories, Services, Custom Directives and the ui-router Resolve service (asynchronous state lifecycle hooks)
* Uses ui-grid for navigation
* Managed with Grunt build Tasks
 
## Fruit15 (Angular 1.5 Project)
All features of the above Fruit1X project with the following modifications:
* All routes converted to Angular 1.5 Components
* ui-router States converted to use Components instead of Views & Controllers
* Sample Custom Directive converted to Angular Component
* Angular Factory converted to Angular Service
 
## Fruit20-15 (AngularJS/1.5 Hybrid Application Project)
This project demonstrates how to run an Angular 1.X project in an Angular 2.0 project using the 
Angular Hybrid Pattern. The pattern involves loading unmodified Angular 1.X code into an Angular 2.0 environment using the Angular 2.0 Angular 2 Project List.
 
The project also demonstrates how to use Angular Ahead-of-Time (AOT) Compilation using the new AOT-compatible version of UpgradeModule from the @angular/upgrade/static library.

This project features the above Fruit15 project with following modifications:
* Creation of a new Angular 2.0 Project to host the hybrid
* Managed using WebPack
* Unit Testing using Karma & WebPack
* The inclusion of a new Custom Angular 2 Component to demonstrate the use of the downgradeComponent feature from the @angular/upgrade/static library.
* Angular 1.5 Source Code Bootstrapped using the UpgradeModule.
* Angular 1.5 Source Code modified as follows:
    * 3rd party typescript /// reference statements modified to import statements to support WebPack
    * Angular 2 Component Added to Detail Component to demonstrate how to host an NG2 Component in an NG1X Application.
 
## Fruit20 (AngularJS Project)
This project demonstrates how to run the same features and patterns as the above projects using native Angular 2 patterns. It will also serve to run performance comparisons against the prior versions and to test out various 3rd party components.
 
* Built and maintained via WebPack
* NG2 Router routes.
* NG2 Router Resolve feature
* NG2 Service using angular-in-memory-web-api & Promises
* NG2 Custom Components
* Use of ui-bootstrap for styling
* Lazy Loading of external modules via the NG2 Router
* Unit Testing using Karma & WebPack
* Internationalization via ng2-translate
* Demonstration of the Angular2 Ahead of Time (AOT) Compilation Feature

### Notes
1. Use of a grid for navigation in the Fruit20 project was modified to a simple table pattern in the Angular 2.0 Project to simplify the AOT process.
2. The internal version of this project uses several components that did not support Observables at the time of writing. Therefore, all asynchonous operations are currently performed with Promises. Correcting this is on the Fruit20 TODO list.