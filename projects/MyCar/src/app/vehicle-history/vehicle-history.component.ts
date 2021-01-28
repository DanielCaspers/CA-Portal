import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatAccordion } from '@angular/material/expansion';
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

	@ViewChild(MatAccordion, {static: false})
	public accordion: MatAccordion;
	public searchQuery = '';
	public vehicleId: string = null;
	private previousVehicleId: string = null;
	public myVehicles: VehicleOverview[] = [];
	public vehicleHistory: VehicleHistoryEntry[] = [];
	public canLoadMore = true;
	private readonly numEntriesToLoad = 20;

	constructor(
		public media: MediaObserver,
		private route: ActivatedRoute,
		private vehiclesHttpService: VehiclesHttpService,
		private vehicleHistoryService: VehicleHistoryHttpService
	) { }

	public ngOnInit(): void {
		this.vehicleId = this.route.snapshot.paramMap.get('vehicleId');
		this.getAllVehicles();
		this.updateVehicleHistory();
	}

	public onSelectionChange(event: any): void {
		// Prevent duplicate event firing on switching back to "All of my vehicles" empty select option. See #52.
		if (event.value !== this.previousVehicleId) {
			this.previousVehicleId = this.vehicleId;
			this.vehicleHistory = [];
			this.updateVehicleHistory();
		}
	}

	public loadMore(): void {
		this.updateVehicleHistory(this.numEntriesToLoad, this.vehicleHistory.length);
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

	private updateVehicleHistory(numEntriesToLoad: number = this.numEntriesToLoad, startFromIndex: number = 0): void {
		const observable = !!this.vehicleId ?
			this.vehicleHistoryService.getVehicleHistoryByVIN(this.vehicleId, numEntriesToLoad, startFromIndex) :
			this.vehicleHistoryService.getVehicleHistoryByClient(numEntriesToLoad, startFromIndex);

		observable
			.pipe(
				first()
			)
			.subscribe((vehicleHistoryEntries) => {
				this.vehicleHistory = this.vehicleHistory.concat(vehicleHistoryEntries);
				// If the number of entries received is less than the number requested, we can't load anymore.
				this.canLoadMore = vehicleHistoryEntries.length === this.numEntriesToLoad;
			});
	}
}
