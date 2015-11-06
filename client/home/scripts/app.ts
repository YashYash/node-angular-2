/**
 *	app.ts - file that bootstraps the app
 */


import { Component, View, bootstrap, provide } from 'angular2/angular2';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_DIRECTIVES, RouteConfig, Location, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, Route, AsyncRoute, Router} from 'angular2/router';

import { Nav } from '/build/home/scripts/directives/nav.js';
import { Home } from '/build/home/scripts/directives/home.js';
import { About } from '/build/home/scripts/directives/about.js';

@Component({
	selector: 'app'
})

@RouteConfig([
	new Route({ path: '/', component: Home, as: 'Home' }),
	new Route({ path: '/about', component: About, as: 'About' })
])

@View({
	templateUrl: "/home/templates/parent.html",
	directives: [Nav, Home, About, ROUTER_DIRECTIVES]
})

// Component controller
class App {

	router: Router;
	location: Location;

	constructor(router: Router, location: Location) {
		this.router = router;
		this.location = location;
	}
}


bootstrap(App, [ROUTER_PROVIDERS, HTTP_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })]);
