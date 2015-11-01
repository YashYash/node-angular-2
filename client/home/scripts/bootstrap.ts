/// <reference path="../typings/angular2/angular2.d.ts" />

import { Component, View, bootstrap } from 'angular2/angular2';
import { Nav } from '/build/home/scripts/directives/nav.js'

@Component({
	selector: 'app'
})

@View({
	templateUrl: "/home/templates/home.html",
	directives: [Nav]
})

// Component controller
class App {
	name: string;

	constructor() {
		this.name = "Got eeeemmmm slaha chotia shit salah mother chode";
	}
}


bootstrap(App);
