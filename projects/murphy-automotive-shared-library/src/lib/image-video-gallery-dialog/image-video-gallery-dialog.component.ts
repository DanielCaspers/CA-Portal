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
	onSlideChange(e) {
		console.log('slide change', e);
	}
}
