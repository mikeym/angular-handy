# Angular Handy Starter Project

This is an Angular seed project that includes components I often need when creating a 
small design prototype. I frequently create little one-off Angular prototype apps, 
and hope that collecting things I typically use in this way might save a bit of time. 
Perhaps it will help you too. You can use this project as you would any of the many 
other Angular 1.x seed projects out there.

Let's call this initial version 0.1.0.

## Goals
My goals for this project were to put together a small Angular starter app that:

* Included responsive styling via Bootstrap
* Included the icons in Font Awesome
* Had well-structured code that stuck pretty close to John Pappa's style guide
* Had good unit tests
* Made a call to an external API and got some JSON data back
* Rendered a JSON collection into a nice table
* Included simple date and time functions
 
## External Components and References
External components or references used in this project include:

* [Angular JS 1.5](https://angularjs.org/) web framework
* [Bootstrap 3](http://getbootstrap.com/) responsive web styles
* [Moment.js 2.14](http://momentjs.com/) clever time and date functions
* [Font Awesome 4.6](http://fontawesome.io/) cute little icons
* [Jasmine 2.4](http://jasmine.github.io/2.4/introduction.html) unit test framework
* [Karma 1.0](https://karma-runner.github.io/1.0/index.html) unit test runner
* [JSONPlaceholder](http://jsonplaceholder.typicode.com/) handy API source of fake JSON data
* [Angular 1 Style Guide](https://github.com/johnpapa/angular-styleguide/tree/master/a1) guidelines I try to follow

## Installation
After cloning the project, you'll need to install the remote components. 
Open a terminal and issue this command:

    npm install
    
NPM will run bower and load all the things.
    
## Running the unit tests
To run the unit tests, first perform the npm install, then issue this terminal command:

    karma start karma.conf.js
    
To exit the tests, enter:

    ctrl + c
    
## Community
Let me know if you have questions or suggestions. I think using the project's issues
tab would be appropriate. Hope the project is useful.

## License
MIT License
