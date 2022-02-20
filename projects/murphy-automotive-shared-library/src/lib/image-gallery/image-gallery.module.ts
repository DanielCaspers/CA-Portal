import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { NgxImageGalleryModule } from 'ngx-image-gallery';

import { ImageGalleryComponent } from './image-gallery.component';

@NgModule({
	declarations: [
		ImageGalleryComponent
	],
	imports: [
		CommonModule,
		// NgxImageGalleryModule
	],
	exports: [
		ImageGalleryComponent
	]
})
class ImageGalleryModule {}

export {
	ImageGalleryModule,
	ImageGalleryComponent
};
