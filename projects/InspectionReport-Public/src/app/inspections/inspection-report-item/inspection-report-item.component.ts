import { Component, Input } from '@angular/core';

import {
	GalleryDialogService,
	MeasurementsFormDialogService
} from 'murphy-automotive-shared-library';

@Component({
	selector: 'ma-inspection-report-item',
	templateUrl: './inspection-report-item.component.html',
	styleUrls: [ './inspection-report-item.component.scss' ]
})
export class InspectionReportItemComponent {

	@Input()
	public inspectionItem;

	@Input()
	public isCondensed = false;

	constructor(public measurementDialog: MeasurementsFormDialogService, public galleryDialog: GalleryDialogService) {}

	public openGallery(): void {
		this.galleryDialog.open(this.inspectionItem);
	}

	public openMeasurementsDialog(): void {
		this.measurementDialog.open(this.inspectionItem);
	}
}
