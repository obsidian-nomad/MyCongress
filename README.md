My Congress @ www.my-congress.herokuapp.com
============

### Introduction
My Congress is an interactive tool to connect, understand, and interpret data surrounding your local congressman. Thanks to the Sunlight Foundation, we are able to pull data about Congressional Representatives.  The app also integrates with a variety of other APIs to deliver constant access to congressional data.

### Getting Started
The project is divided into two main sections.  Client deals with the front-end and server deals with the back end.  To get started running the app, simply run the following commands from a cloned myCongress directory:

     # Install all server-side dependencies
     $ npm install
     # Install all client-side dependencies
     $ bower install
     # Build for distribution and run
     $ grunt serve:dist


Congrats, the server is up and running and you should be able to see the most recent version.

### Directory Structure

MyCongress has two main directories that get compiled to dist when you run ``grunt serve:dist``. The first, client, houses all client-side files, including the angular app, D3 directives, and partials for angular.  You will also find all styling in this section.

The second directory, server, provides all of the backend code.  Here, you'll find the custom api endpoints that integrate with our mongo database. In a typical application flow, we will query our own API for data and display it on the page.  The API interacts with our database via the ORM mongoose.

### License

MIT License 2014
