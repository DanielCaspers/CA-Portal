import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GalleryDialogComponent } from './gallery-dialog.component';
import { IGalleryImage } from '../gallery/gallery.module';

export interface IGalleryDialogViewModel {
	name: string;
	images: IGalleryImage[];
}

@Injectable()
export class GalleryDialogService {

	constructor(private dialog: MatDialog ) { }

	public open(inspectionItem: any): void {
		this.dialog.open(GalleryDialogComponent, {
			maxHeight: '95vh',
			maxWidth: '95vw',
			width: '95%',
			hasBackdrop: true,
			data:  {
				name: inspectionItem.Name,
				images: inspectionItem.Images
			} as IGalleryDialogViewModel
		});
	}
}
