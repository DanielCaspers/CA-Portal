import { Component, Input, ViewChild } from '@angular/core';
import { GALLERY_CONF, GALLERY_IMAGE, NgxImageGalleryComponent } from 'ngx-image-gallery';

@Component({
	selector: 'ma-inspection-report-item',
	templateUrl: './inspection-report-item.component.html',
	styleUrls: [ './inspection-report-item.component.scss' ]
})
export class InspectionReportItemComponent {

	@ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;

	public dialogGalleryConfig: GALLERY_CONF = {
		imageOffset: '0px',
		showDeleteControl: false,
		showImageTitle: true,
		// No use for external URL at this time since nothing to associate image with other URL
		showExtUrlControl: false
	};

	@Input()
	public inspectionItem;

	constructor() {
	}

	public openGallery(index: number = 0): void {
		this.ngxImageGallery.open(index);
	}
}
