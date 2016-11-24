# berightthere
A NodeJS based server for receiving GPS coordinates and plotting a route using Swagger and ExpressJS. The application consists of two parts: A REST API generated using Swagger and an Express JS application. 

The REST API allows developers to write software that can check-in, submit GPS coordinates for a route and checkout.

The Express JS application allows end users to view a consantly up-to-date overview of a route using Google Maps and web sockets.

## Requirements

* [Node](https://nodejs.org)

## How to run

Install dependencies using:

``` bash
$ npm install
```

Run using:

``` bash
$ npm start
```

Run tests using:

``` bash
$ npm test
```