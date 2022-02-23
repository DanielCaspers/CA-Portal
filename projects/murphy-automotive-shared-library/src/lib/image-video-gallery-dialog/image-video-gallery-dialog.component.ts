import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

// Import Swiper and modules
import SwiperCore, {Navigation, Pagination, SwiperOptions, Keyboard} from 'swiper';

SwiperCore.use([Keyboard, Navigation, Pagination]);

@Component({
	selector: 'ma-image-video-gallery-dialog',
	templateUrl: './image-video-gallery-dialog.component.html',
	styleUrls: ['./image-video-gallery-dialog.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ImageVideoGalleryDialogComponent {

	public swiperOptions: SwiperOptions;

	/**
	 *  0-based index of currently navigated item in gallery.
	 *  Used for open-in-new button outside of gallery.
	 */
	public activeIndex = 0;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
		this.swiperOptions = {
			modules: [Navigation, Pagination, Keyboard],
			loop: true,
			navigation: true,
			pagination: {
				type: 'bullets'
			},
			keyboard: {
				enabled: true
			},
			spaceBetween: 30,
			grabCursor: true
		};
	}

	onSwiper(mySwiper) {
		console.log(mySwiper);
	}

	public onSlideChange(e): void {
		if (!!this.data && !!this.data.Images && this.data.Images.length > 0) {
			console.log('slide change', e[0]);
			console.log('Active Index', (e[0].activeIndex % this.data.Images.length) - 1 );
			this.activeIndex = (e[0].activeIndex % this.data.Images.length) - 1 ; // Event is 1-based index
		}
	}

}
