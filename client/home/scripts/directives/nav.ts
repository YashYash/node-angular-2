import { Component, View } from 'angular2/angular2';
import { Location } from 'angular2/router'

@Component({
	selector: 'nav'
})

@View({
	templateUrl: "/home/templates/nav.html"
})

// Component controller
export class Nav {

	location: Location;

    getLinkStyle(path) {

        if (path === this.location.path()) {
            return true;
        }
        else if (path.length > 0) {
            return this.location.path().indexOf(path) > -1;
        }
    }
}

