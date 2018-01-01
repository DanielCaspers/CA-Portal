import { Component, OnInit, ViewChild } from '@angular/core';
import { InspectionService } from '../../inspection.service';
import { GALLERY_CONF, GALLERY_IMAGE, NgxImageGalleryComponent } from 'ngx-image-gallery';

@Component({
	selector: 'ma-inspection-table',
	templateUrl: './inspection-table.component.html',
	styleUrls: [ './inspection-table.component.scss' ]
})
export class InspectionTableComponent implements OnInit {

	public inspectionItems;
	public showProgress = true;

	public selectedImages: GALLERY_IMAGE[] = [];

	@ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;
	@ViewChild('inspectionTable') table: any;

	public dialogGalleryConfig: GALLERY_CONF = {
		imageOffset: '0px',
		showDeleteControl: false,
		showImageTitle: true,
		// No use for external URL at this time since nothing to associate image with other URL
		showExtUrlControl: false
	};

	constructor(private inspectionService: InspectionService) {
	}

	public ngOnInit(): void {
		this.inspectionService.getInspectionReport()
			// .finally(() => {
			// 	this.showProgress = false;
			// })
			.subscribe((response) => {
				this.inspectionItems = response.InspectionReportItems;

				// Need to bind images during OnInit for proper initialization of ngxImageGallery
				// These are replaced on image open click in openGallery()
				this.selectedImages = this.inspectionItems[0].Images;

				console.log('My inspection items', this.inspectionItems);
				this.showProgress = false;
			});
	}

	public openGallery(images: GALLERY_IMAGE[], index: number = 0): void {
		// Trigger change detection and dynamically bind new images on button click
		this.selectedImages = images;

		this.ngxImageGallery.open(index);
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
