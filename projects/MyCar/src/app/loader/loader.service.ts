import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class LoaderService {

	public isLoading$ = new BehaviorSubject(false);
	private requests: HttpRequest<any>[] = [];

	constructor() { }

	public addRequest(request: HttpRequest<any> ): void {
		this.requests.push(request);
		console.log('Request enqueued. Requests pending in queue:', this.requests.map(r => r.url));
		this.isLoading$.next(true);
	}

	public removeRequest(request: HttpRequest<any>): void {
		const i = this.requests.indexOf(request);
		if (i >= 0) {
			this.requests.splice(i, 1);
			console.log('Request dequeued. Requests pending in queue:', this.requests.map(r => r.url));
		}
		this.isLoading$.next(this.requests.length > 0);
	}

	public clearAllPendingRequests(): void {
		this.requests = [];
		console.log('All pending requests have been removed.');
	}
}

