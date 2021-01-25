import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { first } from 'rxjs/operators';

import {
	ConfirmDialogService,
	RecommendedService,
	RecommendedServicesDialogService
} from 'murphy-automotive-shared-library';
import { VehiclesHttpService } from '../vehicles-http.service';
import { HttpResponse } from '@angular/common/http';

@Component({
	selector: 'ma-vehicle-card',
	templateUrl: './vehicle-card.component.html',
	styleUrls: [ './vehicle-card.component.scss' ],
	encapsulation: ViewEncapsulation.Emulated
})
export class VehicleCardComponent {

	@Input()
	public make: string;

	@Input()
	public model: string;

	@Input()
	public license: string;

	@Input()
	public recommendedServices: RecommendedService[] = [];

	@Input()
	public recommendedServiceSeverity: number;

	@Input()
	public vehicleId: string;

	@Input()
	public year: string;

	@Input()
	public nextOilChangeDate: string;

	@Input()
	public nextOilChangeOdometer: Date;

	@Output()
	public vehicleDeleted: EventEmitter<string> = new EventEmitter<string>();

	constructor(
		private confirmDialogService: ConfirmDialogService,
		private recommendedServicesDialogService: RecommendedServicesDialogService,
		private vehiclesHttpService: VehiclesHttpService) {
	}

	public openRecommendedServicesDialog(): void {
		this.recommendedServicesDialogService.open(this.recommendedServices);
	}

	public openVehicleDeletionDialog(): void {
		this.confirmDialogService.open(
			'Delete vehicle?',
			`Deleting your vehicle will remove it from your vehicle list.`,
			'Delete',
			'Cancel'
		)
		.afterClosed()
		.pipe(
			first()
		)
		.subscribe((confirmed) => {
			if (confirmed) {
				this.vehiclesHttpService.deleteVehicleForClient(this.vehicleId)
					.pipe(
						first()
					)
					.subscribe(() => {
						this.vehicleDeleted.emit(this.vehicleId);
					}, (error) => {
						console.error(`Vehicle with ID ${this.vehicleId} could not be deleted. Error message: ${error}`);
					});
			}
		});
	}
}
