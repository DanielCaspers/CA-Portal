import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { VehicleOverview } from './vehicle.models';

@Component({
	selector: 'ma-my-vehicles',
	templateUrl: './my-vehicles.component.html',
	styleUrls: [ './my-vehicles.component.scss' ],
	encapsulation: ViewEncapsulation.Emulated
})
export class MyVehiclesComponent implements OnInit {

	public vehicles: VehicleOverview[] = [
		{
			year: '2006',
			make: 'Chevrolet',
			model: 'Impala',
			license: 'Z25-7549',
			color: 'Blue',
			recommendedServiceSeverity: 1
		},
		{
			year: '1989',
			make: 'Ferrari',
			model: 'F40',
			license: 'AB12345',
			color: 'Red',
			recommendedServiceSeverity: 4
		},
		{
			year: '2016',
			make: 'Ford',
			model: 'Mustang',
			license: 'AJ64625',
			color: 'Grey',
			recommendedServiceSeverity: 10
		}
	];

	constructor() {
	}

	ngOnInit() {
	}

}
