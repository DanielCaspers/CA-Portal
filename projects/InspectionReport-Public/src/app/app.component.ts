import { Component } from '@angular/core';
import { NgxAnalyticsGoogleAnalytics } from 'ngx-analytics/ga';

@Component({
	selector: 'ma-root',
	template: `<router-outlet></router-outlet>`
})
export class AppComponent {
	// Required: Import analytics providers in the root component. This starts the tracking of route changes.
	constructor(googleAnalyticsService: NgxAnalyticsGoogleAnalytics) { }

}
