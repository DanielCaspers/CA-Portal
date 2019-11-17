import { Component, Input, ViewChild } from '@angular/core';

import {
	ImageGalleryComponent,
	MeasurementsFormDialogService
} from 'murphy-automotive-shared-library';

@Component({
	selector: 'ma-inspection-report-item',
	templateUrl: './inspection-report-item.component.html',
	styleUrls: [ './inspection-report-item.component.scss' ]
})
export class InspectionReportItemComponent {

	@ViewChild(ImageGalleryComponent, {static: false}) maImageGallery: ImageGalleryComponent;

	@Input()
	public inspectionItem;

	@Input()
	public isCondensed = false;

	constructor(public measurementDialog: MeasurementsFormDialogService) {}

	public openGallery(index: number = 0): void {
		this.maImageGallery.open(index);
	}

	public openMeasurementsDialog(): void {
		this.measurementDialog.open(this.inspectionItem);
	}
}
