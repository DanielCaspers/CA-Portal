import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageVideoGalleryDialogComponent } from './image-video-gallery-dialog.component';

@Injectable()
export class ImageVideoGalleryDialogService {

	constructor(private dialog: MatDialog ) { }

	public open(inspectionItem: any): void {
		this.dialog.open(ImageVideoGalleryDialogComponent, {
			maxHeight: '95vh',
			maxWidth: '95vw',
			width: '95%',
			hasBackdrop: true,
			data:  {
				name: inspectionItem.Name,
				images: inspectionItem.Images
			}
		});
	}
}
