/// <reference path="../typings/angular2/angular2.d.ts" />

import { Component, View, bootstrap } from 'angular2/angular2';

@Component({
	selector: 'app'
})

@View({
	templateUrl: "templates/home.html"
})

// Component controller
export class App {
	name: string;

	constructor() {
		this.name = "Yash Saxena salah chotia";
	}
}

// bootstrap(App);
