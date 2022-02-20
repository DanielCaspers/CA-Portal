// import { NgxAnalyticsGoogleAnalytics } from 'ngx-analytics/ga';

export class InspectionReportItemContainerComponent {
	constructor(
		// private googleAnalyticsService: NgxAnalyticsGoogleAnalytics
	) {
	}

	public onCollapse(accordionName: string, accordionType: 'InspectionItem' | 'InspectionItemGroup'): void {
		// this.googleAnalyticsService.eventTrack('Collapsed', { category: accordionType, label: accordionName});
	}

	public onExpand(accordionName: string, accordionType: 'InspectionItem' | 'InspectionItemGroup'): void {
		// this.googleAnalyticsService.eventTrack('Expanded', { category: accordionType, label: accordionName});
	}

	public shouldExpand(inspectionItem): boolean {
		return (inspectionItem.Measurements && inspectionItem.Measurements.length > 0) ||
			(inspectionItem.CannedResponses && inspectionItem.CannedResponses.length > 0) ||
			(inspectionItem.Images && inspectionItem.Images.length > 0) ||
			!!inspectionItem.Note;
	}
}
