import { Component, Inject, Input } from '@angular/core';

import { GalleryDialogService } from '../../gallery-dialog/gallery-dialog.service';
import { MeasurementsFormDialogService } from '../../measurements-form-dialog/measurements-form-dialog.service';

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

	public displayMode: 'Public' | 'Internal';

	constructor(
		public measurementDialog: MeasurementsFormDialogService,
		public galleryDialog: GalleryDialogService,
		@Inject('ENVIRONMENT')
		private environment
	) {
		this.displayMode = this.environment.features.inspections.displayMode;
	}

	public openGallery(): void {
		this.galleryDialog.open(this.inspectionItem);
	}

	public openMeasurementsDialog(): void {
		this.measurementDialog.open(this.inspectionItem);
	}
}
