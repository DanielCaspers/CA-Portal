// loader.interceptors.ts
import { Injectable } from '@angular/core';
import {
	HttpResponse,
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';

import { NgxAnalyticsGoogleAnalytics } from 'ngx-analytics/ga';
import { Observable } from 'rxjs';

import { LoaderService } from './loader.service';

/**
 * See
 * https://www.freakyjolly.com/angular-8-7-show-global-progress-bar-loader-on-http-calls-in-3-steps-using-angular-interceptors-in-angular-4-3/
 * for more info
 */
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
	private requests: HttpRequest<any>[] = [];

	constructor(private loaderService: LoaderService, private googleAnalyticsService: NgxAnalyticsGoogleAnalytics) { }

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		this.requests.push(req);
		console.log('No of requests enqueued:', this.requests.length);
		this.loaderService.isLoading.next(true);

		return new Observable(observer => {
			const subscription = next.handle(req)
				.subscribe(
					event => {
						if (event instanceof HttpResponse) {
							this.removeRequest(req);
							observer.next(event);
						}
					},
					err => {
						console.error('Loader.interceptor failed. Go investigate why. ');

						const crashReport = {
							httpStatus: err.status,
							requestUrl: err.url,
							message: err.message
						};
						this.googleAnalyticsService.eventTrack('Request Failed', {
							category: 'App Diagnostics',
							label: 'HTTP Request Interceptor',
							value: JSON.stringify(crashReport)
						});
						this.removeRequest(req);
						observer.error(err);
					},
					() => {
						this.removeRequest(req);
						observer.complete();
					});
			// remove request from queue when cancelled
			return () => {
				this.removeRequest(req);
				subscription.unsubscribe();
			};
		});
	}

	private removeRequest(req: HttpRequest<any>): void {
		const i = this.requests.indexOf(req);
		if (i >= 0) {
			this.requests.splice(i, 1);
		}
		this.loaderService.isLoading.next(this.requests.length > 0);
	}
}
