import { Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IGalleryDialogViewModel } from './gallery-dialog.service';

@Component({
	selector: 'ma-gallery-dialog',
	templateUrl: './gallery-dialog.component.html',
	styleUrls: ['./gallery-dialog.component.scss']
})
export class GalleryDialogComponent implements OnChanges {
	public imageUrl: string;

	private activeIndex = 0;

	constructor(@Inject(MAT_DIALOG_DATA) public data: IGalleryDialogViewModel) {
		this.updateImageUrl();
	}

	public ngOnChanges(changeObj: SimpleChanges): void {
		this.updateImageUrl();
	}

	public onClick(): void {
		window.open(this.imageUrl);
	}

	public onIndexChanged(index: number) {
		this.activeIndex = index;
		this.updateImageUrl();
	}

	private updateImageUrl() {
		if (!!this.data && !!this.data.images && this.data.images.length > 0) {
			this.imageUrl = this.data.images[this.activeIndex].url;
		}
	}

}
