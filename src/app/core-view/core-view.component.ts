import { Component, OnInit } from '@angular/core';

interface MAStoreInfo {
	phoneNumber: string;
	logoUrl: string;
	storeUrl: string;
}

@Component({
	selector: 'ma-core-view',
	templateUrl: './core-view.component.html',
	styleUrls: [ './core-view.component.scss' ]
})
export class CoreViewComponent implements OnInit {

	public storeInfo: MAStoreInfo = {
		phoneNumber: '+19524322454',
		logoUrl: 'https://www.protech-automotive.com/_images/logos/004.png',
		storeUrl: 'http://www.protech-automotive.com/'
	};

	constructor() {
	}

	public ngOnInit(): void {

	}

}
