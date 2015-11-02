import { Component, View, bootstrap } from 'angular2/angular2';
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
	selector: 'about',
	directives: [ROUTER_DIRECTIVES],
	templateUrl: "/home/templates/about.html"
})


// Component controller
export class About {
	name: string;

	constructor() {
		this.name = "Yash Saxena salah chotia";
	}
}

