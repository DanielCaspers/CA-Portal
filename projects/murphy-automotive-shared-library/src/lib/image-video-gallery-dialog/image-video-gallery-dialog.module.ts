import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { SwiperModule } from 'swiper/angular';

import { ImageVideoGalleryDialogComponent } from './image-video-gallery-dialog.component';
import { ImageVideoGalleryDialogService } from './image-video-gallery-dialog.service';

@NgModule({
	declarations: [
		ImageVideoGalleryDialogComponent
	],
	entryComponents: [
		ImageVideoGalleryDialogComponent
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		MatButtonModule,
		MatDialogModule,
		MatIconModule,
		SwiperModule
	],
	providers: [
		ImageVideoGalleryDialogService
	],
	exports: [
		ImageVideoGalleryDialogComponent
	]
})
class ImageVideoGalleryDialogModule {}

export {
	ImageVideoGalleryDialogModule,
	ImageVideoGalleryDialogService
};
