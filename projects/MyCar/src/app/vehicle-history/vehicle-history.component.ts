import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { sortBy } from 'lodash-es';
import { first } from 'rxjs/operators';

import { VehicleHistoryEntry } from './vehicle-history.models';
import { VehicleHistoryHttpService } from './vehicle-history-http.service';
import { VehiclesHttpService } from '../my-vehicles/vehicles-http.service';
import { VehicleOverview } from '../my-vehicles/vehicle.models';

@Component({
	selector: 'ma-vehicle-history',
	templateUrl: './vehicle-history.component.html',
	styleUrls: [ './vehicle-history.component.scss' ],
	encapsulation: ViewEncapsulation.Emulated
})
export class VehicleHistoryComponent implements OnInit {

	public vehicleId: string = null;
	public myVehicles: VehicleOverview[] = [];
	public vehicleHistory: VehicleHistoryEntry[] = [];

	constructor(
		private route: ActivatedRoute,
		private vehiclesHttpService: VehiclesHttpService,
		private vehicleHistoryService: VehicleHistoryHttpService
	) { }

	public ngOnInit(): void {
		this.vehicleId = this.route.snapshot.paramMap.get('vehicleId');
		this.getAllVehicles();
		this.updateVehicleHistory();
	}

	public onSelectionChange(): void {
		this.updateVehicleHistory();
	}

	private getAllVehicles(): void {
		this.vehiclesHttpService.getVehiclesForClient()
			.pipe(first())
			.subscribe((vehicles) => {
				// The vehicle list in the dropdown should be sorted by year, make, model, and license.
				// Vehicles which do not yet have history (because they have no VIN) are omitted,
				this.myVehicles = sortBy(vehicles, 'year', 'make', 'model', 'license').filter(v => !!v.vehicleID);
			});
	}

	private updateVehicleHistory(): void {
		const observable = !!this.vehicleId ?
			this.vehicleHistoryService.getVehicleHistoryByVIN(this.vehicleId) :
			this.vehicleHistoryService.getVehicleHistoryByClient();

		observable
			.pipe(
				first()
			)
			.subscribe((vehicleHistoryEntries) => {
				this.vehicleHistory = vehicleHistoryEntries;
			});
	}
}
