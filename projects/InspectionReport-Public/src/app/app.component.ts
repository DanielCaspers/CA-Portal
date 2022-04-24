import { Component } from '@angular/core';
import { gitInfo } from '../../../../git-version';

// import { NgxAnalyticsGoogleAnalytics } from 'ngx-analytics/ga';

@Component({
	selector: 'ma-root',
	template: `
		<router-outlet></router-outlet>
		<ma-commit-summary [gitInfo]="gitInfo"></ma-commit-summary>
	`
})
export class AppComponent {

	public gitInfo = gitInfo;
	// Required: Import analytics providers in the root component. This starts the tracking of route changes.
	// https://www.npmjs.com/package/ngx-analytics
	constructor(/* googleAnalyticsService: NgxAnalyticsGoogleAnalytics */) { }
}
