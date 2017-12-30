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
		showImageTitle: false,
		// No use for external URL at this time since nothing to associate image with other URL
		showExtUrlControl: false
	};

	public images: GALLERY_IMAGE[] = [
		{
			url: "https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=1260",
			altText: 'woman-in-black-blazer-holding-blue-cup',
			title: 'woman-in-black-blazer-holding-blue-cup',
			thumbnailUrl: "https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=60"
		},
		{
			url: "https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=1260",
			altText: 'two-woman-standing-on-the-ground-and-staring-at-the-mountain',
			extUrl: 'https://www.pexels.com/photo/two-woman-standing-on-the-ground-and-staring-at-the-mountain-669006/',
			thumbnailUrl: "https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=60"
		}
	];

	@Input()
	public inspectionItem;

	constructor() {
	}

	public openGallery(index: number = 0): void {
		this.ngxImageGallery.open(index);
	}
}
