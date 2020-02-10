import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { VehicleHistoryEntry } from './vehicle-history.models';
import { VehicleHistoryHttpService } from './vehicle-history-http.service';

@Component({
	selector: 'ma-vehicle-history',
	templateUrl: './vehicle-history.component.html',
	styleUrls: [ './vehicle-history.component.scss' ],
	encapsulation: ViewEncapsulation.Emulated
})
export class VehicleHistoryComponent implements OnInit {

	private vehicleId: string = null;

	public vehicleHistory: VehicleHistoryEntry[] = [];

	constructor(
		private route: ActivatedRoute,
		private vehicleHistoryService: VehicleHistoryHttpService
	) { }

	public ngOnInit(): void {
		this.vehicleId = this.route.snapshot.paramMap.get('vehicleId');
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
