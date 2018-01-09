import { Component, Input, ViewChild } from '@angular/core';

import {
	ImageGalleryComponent,
	MeasurementsFormDialogService
} from '../../../../shared';

@Component({
	selector: 'ma-inspection-report-item',
	templateUrl: './inspection-report-item.component.html',
	styleUrls: [ './inspection-report-item.component.scss' ]
})
export class InspectionReportItemComponent {

	@ViewChild(ImageGalleryComponent) maImageGallery: ImageGalleryComponent;

	@Input()
	public inspectionItem;

	constructor(public measurementDialog: MeasurementsFormDialogService) {}

	public openGallery(index: number = 0): void {
		this.maImageGallery.open(index);
	}

	public openMeasurementsDialog(): void {
		this.measurementDialog.open(this.inspectionItem);
	}
}
