import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SwiperModule } from 'swiper/angular';

import { GalleryComponent, IGalleryImage } from './gallery.component';

@NgModule({
	declarations: [
		GalleryComponent
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		SwiperModule
	],
	exports: [
		GalleryComponent
	]
})
class GalleryModule {}

export {
	GalleryModule,
	IGalleryImage
};
