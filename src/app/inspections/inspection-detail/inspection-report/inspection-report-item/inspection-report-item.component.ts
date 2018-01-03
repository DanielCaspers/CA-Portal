import { Component, Input, ViewChild } from '@angular/core';
import { ImageGalleryComponent } from '../../../../shared/image-gallery/image-gallery.component';

@Component({
	selector: 'ma-inspection-report-item',
	templateUrl: './inspection-report-item.component.html',
	styleUrls: [ './inspection-report-item.component.scss' ]
})
export class InspectionReportItemComponent {

	@ViewChild(ImageGalleryComponent) maImageGallery: ImageGalleryComponent;

	@Input()
	public inspectionItem;

	constructor() {}

	public openGallery(index: number = 0): void {
		this.maImageGallery.open(index);
	}
}
