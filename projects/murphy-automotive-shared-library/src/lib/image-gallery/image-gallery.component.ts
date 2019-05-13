import { Component, Input, ViewChild } from '@angular/core';
import { GALLERY_CONF, GALLERY_IMAGE, NgxImageGalleryComponent } from 'ngx-image-gallery';

@Component({
	selector: 'ma-image-gallery',
	templateUrl: './image-gallery.component.html',
	styleUrls: [ './image-gallery.component.scss' ]
})
export class ImageGalleryComponent {

	public dialogGalleryConfig: GALLERY_CONF = {
		imageOffset: '0px',
		showDeleteControl: false,
		showImageTitle: true,
		showExtUrlControl: true
	};

	@Input() public images: GALLERY_IMAGE[];

	// @ViewChild(NgxImageGalleryComponent) public ngxImageGallery: NgxImageGalleryComponent;

	constructor() {
	}

	public galleryImageClicked(index): void {
		window.open(this.images[index].url);
	}

	public open(index: number = 0): void {
		// this.ngxImageGallery.open(index);
	}
}
