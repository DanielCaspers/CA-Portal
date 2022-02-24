import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';

// Import Swiper and modules
import SwiperCore, {Navigation, Pagination, SwiperOptions, Keyboard} from 'swiper';

SwiperCore.use([Keyboard, Navigation, Pagination]);

export interface IGalleryImage {
	url: string;
}

@Component({
	selector: 'ma-gallery',
	templateUrl: './gallery.component.html',
	styleUrls: ['./gallery.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class GalleryComponent {

	@ViewChildren('videoPlayer', {read: ElementRef})
	public videos: QueryList<ElementRef>;

	public swiperOptions: SwiperOptions = {
		modules: [Navigation, Pagination, Keyboard],
		loop: false,
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

	/**
	 *  0-based index of currently navigated item in gallery.
	 *  Used for open-in-new button outside of gallery.
	 */
	private activeIndex = 0;

	@Output()
	public indexChanged: EventEmitter<number> = new EventEmitter<number>();

	@Input()
	public images: IGalleryImage[];

	onSwiper(mySwiper) {
		console.log(mySwiper);
	}

	public onSlideChange(e): void {
		if (!!this.images && this.images.length > 0) {
			this.indexChanged.emit(e[0].activeIndex);
			this.pauseAllVideos();
		}
	}

	private pauseAllVideos(): void {
		this.videos.forEach((v) => v.nativeElement.pause());
	}

}
