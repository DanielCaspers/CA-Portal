import { Component, OnInit, ViewChild } from '@angular/core';
import { InspectionService } from '../../inspection.service';
import { GALLERY_IMAGE } from 'ngx-image-gallery';
import { ImageGalleryComponent } from '../../../shared/image-gallery/image-gallery.component';

import 'rxjs/add/operator/finally';

@Component({
	selector: 'ma-inspection-table',
	templateUrl: './inspection-table.component.html',
	styleUrls: [ './inspection-table.component.scss' ]
})
export class InspectionTableComponent implements OnInit {

	public inspectionItems;
	public showProgress = true;

	public selectedImages: GALLERY_IMAGE[] = [];

	@ViewChild(ImageGalleryComponent) maImageGallery: ImageGalleryComponent;
	@ViewChild('inspectionTable') table: any;

	constructor(private inspectionService: InspectionService) {
	}

	public ngOnInit(): void {
		this.inspectionService.getInspectionReport()
			.finally(() => {
				this.showProgress = false;
			})
			.subscribe((response) => {
				this.inspectionItems = response.InspectionReportItems;
				// Need to bind images during OnInit for proper initialization of ngxImageGallery
				// These are replaced on image open click in openGallery()
				const firstIIWithImages = this.inspectionItems.find(ii => ii.Images && ii.Images.length > 0);
				this.selectedImages = firstIIWithImages && firstIIWithImages.Images;

				console.log('My inspection items', this.inspectionItems);
			});
	}

	public openGallery(images: GALLERY_IMAGE[], index: number = 0): void {
		// Trigger change detection and dynamically bind new images on button click
		this.selectedImages = images;

		this.maImageGallery.open(index);
	}

	public toggleExpandRow(row): void {
		this.table.rowDetail.toggleExpandRow(row);
	}

	public hasDetails(row): boolean {
		return (row.Measurements && row.Measurements.length > 0) ||
			(row.CannedResponses && row.CannedResponses.length > 0) ||
			(row.Note && row.Note.length > 0);
	}
}
