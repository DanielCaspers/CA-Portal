import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { StoreInfoService } from '../../http/store-info/store-info.service';
import { GalleryDialogService } from '../../gallery-dialog/gallery-dialog.service';
import { MeasurementsFormDialogService } from '../../measurements-form-dialog/measurements-form-dialog.service';

@Component({
	selector: 'ma-inspection-report-item',
	templateUrl: './inspection-report-item.component.html',
	styleUrls: [ './inspection-report-item.component.scss' ]
})
export class InspectionReportItemComponent implements OnInit, OnDestroy {

	@Input()
	public inspectionItem;

	@Input()
	public isCondensed = false;

	public displayMode: 'Public' | 'Internal';

	private readonly urlVariableSubstitutionToken = '{?webaddr?}';

	private storeInfoSubscription: Subscription;
	private cannedResponseBaseUrl: string;

	constructor(
		public measurementDialog: MeasurementsFormDialogService,
		public galleryDialog: GalleryDialogService,
		@Inject('ENVIRONMENT')
		private environment,
		public storeInfoService: StoreInfoService,
	) {
		this.displayMode = this.environment.features.inspections.displayMode;
	}

	public ngOnInit(): void {
		this.storeInfoSubscription =
			this.storeInfoService.storeInfo$.subscribe((storeInfo) => {
				this.cannedResponseBaseUrl = storeInfo.StoreWebAssets.WebAddress;
			});
	}

	public ngOnDestroy(): void {
		this.storeInfoSubscription.unsubscribe();
	}

	public openGallery(): void {
		this.galleryDialog.open(this.inspectionItem);
	}

	public openMeasurementsDialog(): void {
		this.measurementDialog.open(this.inspectionItem);
	}

	/**
	 * If the URI contains the variable substitution token at the beginning of the URI,
	 * replace it to allow per-domain branding of help topic content.
	 * @param url returned from Digital Inspection help content management prior to variable substitution
	 */
	public transformCannedResponseUrl(url: string): string {
		if (!!this.cannedResponseBaseUrl && url.startsWith(this.urlVariableSubstitutionToken)) {
			return url.replace(this.urlVariableSubstitutionToken, this.cannedResponseBaseUrl);
		}

		return url;
	}
}
