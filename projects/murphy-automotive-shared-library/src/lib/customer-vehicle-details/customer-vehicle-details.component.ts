import { Component, Input } from '@angular/core';

@Component({
	selector: 'ma-customer-vehicle-details',
	templateUrl: './customer-vehicle-details.component.html',
	styleUrls: [ './customer-vehicle-details.component.scss' ]
})
export class CustomerVehicleDetailsComponent {

	@Input()
	public vehicle;

	constructor() { }
}
