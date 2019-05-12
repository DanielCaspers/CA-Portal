import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { VehicleHistoryEntry } from './vehicle-history.models';

@Component({
	selector: 'ma-vehicle-history',
	templateUrl: './vehicle-history.component.html',
	styleUrls: [ './vehicle-history.component.scss' ],
	encapsulation: ViewEncapsulation.Emulated
})
export class VehicleHistoryComponent implements OnInit {

	public vehicleHistory: VehicleHistoryEntry[] = [
		{
			date: '10/08/2018',
			odometer: 208202,
			description: `LUBE, OIL, FILTER.`,
			amount: 75.09,
			year: '2011',
			make: 'Toyota',
			model: 'Avalon',
			color: 'White'
		},
		{
			date: '07/16/2018',
			odometer: 203085,
			description: 'REPLACE WIPERS',
			amount: 101.29,
			year: '2006',
			make: 'Chevrolet',
			model: 'Impala',
			color: 'blue'
		},
		{
			date: '04/12/2018',
			odometer: 197409,
			description: 'ROTATE TIRES',
			amount: 175.09,
			year: '2016',
			make: 'Ford',
			model: 'Mustang',
			color: 'Grey'
		},
		{
			date: '02/13/2018',
			odometer: 192317,
			description: 'REPLACE BATTERY',
			amount: 745.09,
			year: '2004',
			make: 'Saleen',
			model: 'S7',
			color: 'Orange'
		},
		{
			date: '01/24/2018',
			odometer: 191509,
			description: 'REPLACE TIRES',
			amount: 1432.09,
			year: '2006',
			make: 'Chevrolet',
			model: 'Impala',
			color: 'blue'
		},
		{
			date: '10/08/2018',
			odometer: 208202,
			description: `LUBE, OIL, FILTER.`,
			amount: 75.09,
			year: '2011',
			make: 'Toyota',
			model: 'Avalon',
			color: 'White'
		},
		{
			date: '07/16/2018',
			odometer: 203085,
			description: 'REPLACE WIPERS',
			amount: 101.29,
			year: '2006',
			make: 'Chevrolet',
			model: 'Impala',
			color: 'blue'
		},
		{
			date: '04/12/2018',
			odometer: 197409,
			description: 'ROTATE TIRES',
			amount: 175.09,
			year: '2016',
			make: 'Ford',
			model: 'Mustang',
			color: 'Grey'
		},
		{
			date: '02/13/2018',
			odometer: 192317,
			description: 'REPLACE BATTERY',
			amount: 745.09,
			year: '2004',
			make: 'Saleen',
			model: 'S7',
			color: 'Orange'
		},
		{
			date: '01/24/2018',
			odometer: 191509,
			description: 'REPLACE TIRES',
			amount: 1432.09,
			year: '2006',
			make: 'Chevrolet',
			model: 'Impala',
			color: 'blue'
		},
		{
			date: '10/08/2018',
			odometer: 208202,
			description: `LUBE, OIL, FILTER.`,
			amount: 75.09,
			year: '2011',
			make: 'Toyota',
			model: 'Avalon',
			color: 'White'
		},
		{
			date: '07/16/2018',
			odometer: 203085,
			description: 'REPLACE WIPERS',
			amount: 101.29,
			year: '2006',
			make: 'Chevrolet',
			model: 'Impala',
			color: 'blue'
		},
		{
			date: '04/12/2018',
			odometer: 197409,
			description: 'ROTATE TIRES',
			amount: 175.09,
			year: '2016',
			make: 'Ford',
			model: 'Mustang',
			color: 'Grey'
		},
		{
			date: '02/13/2018',
			odometer: 192317,
			description: 'REPLACE BATTERY',
			amount: 745.09,
			year: '2004',
			make: 'Saleen',
			model: 'S7',
			color: 'Orange'
		},
		{
			date: '01/24/2018',
			odometer: 191509,
			description: 'REPLACE TIRES',
			amount: 1432.09,
			year: '2006',
			make: 'Chevrolet',
			model: 'Impala',
			color: 'blue'
		}
	];

	constructor() {
	}

	ngOnInit() {
	}



}
