import { Component } from '@angular/core';
// import { NgxAnalyticsGoogleAnalytics } from 'ngx-analytics/ga';

import { gitInfo } from '../../../../git-version';

@Component({
	selector: 'ma-root',
	template: `<router-outlet></router-outlet>`
})
export class AppComponent {

	public gitInfo = gitInfo;

	// Required: Import analytics providers in the root component. This starts the tracking of route changes.
	// https://www.npmjs.com/package/ngx-analytics
	constructor(
		// googleAnalyticsService: NgxAnalyticsGoogleAnalytics
	) { }}
