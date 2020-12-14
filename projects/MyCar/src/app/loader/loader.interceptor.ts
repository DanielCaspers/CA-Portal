import { Injectable } from '@angular/core';
import {
	HttpResponse,
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';

import { NgxAnalyticsGoogleAnalytics } from 'ngx-analytics/ga';
import { EMPTY, Observable } from 'rxjs';

import { LoaderService } from './loader.service';
import { catchError, filter, tap } from 'rxjs/operators';

/**
 * See
 * https://www.freakyjolly.com/angular-8-7-show-global-progress-bar-loader-on-http-calls-in-3-steps-using-angular-interceptors-in-angular-4-3/
 * for more info
 */
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

	constructor(private loaderService: LoaderService, private googleAnalyticsService: NgxAnalyticsGoogleAnalytics) { }

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		this.loaderService.addRequest(req);

		return next.handle(req)
				.pipe(
					filter(event => event instanceof HttpResponse),
					tap(() => {
						this.loaderService.removeRequest(req);
					}),
					catchError((err) => {
						console.error('Loader.interceptor failed. Go investigate why. Error:', err, 'Request', req);
						this.loaderService.removeRequest(req);

						const slimHttpErrorResponse = {
							httpStatus: err.status,
							requestUrl: err.url,
							message: err.message
						};
						this.googleAnalyticsService.eventTrack('Request Failed', {
							category: 'App Diagnostics',
							label: `HTTP ${slimHttpErrorResponse.httpStatus} Response`,
							value: JSON.stringify(slimHttpErrorResponse)
						});
						return EMPTY;
					})
				);
	}
}
