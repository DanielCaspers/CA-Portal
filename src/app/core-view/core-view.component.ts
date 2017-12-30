import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'ma-core-view',
	templateUrl: './core-view.component.html',
	styleUrls: [ './core-view.component.scss' ]
})
export class CoreViewComponent implements OnInit {

	public storePhoneNumber = '+19522706622';

	public vehicle = {
		year: '2012',
		make: 'Toyota',
		model: 'Avalon',
		license: '958-ETV',
		color: 'blue'
	};

	constructor() {
	}

	ngOnInit() {
	}

}
