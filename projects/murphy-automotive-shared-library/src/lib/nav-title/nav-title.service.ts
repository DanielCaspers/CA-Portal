import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class NavTitleService {

	private navTitleSubject = new BehaviorSubject('');

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
	) {
	}

	public get navTitle$(): Observable<string> {
		return this.navTitleSubject.asObservable();
	}

	public init() {
		this.navTitleFromRouterEvents$.subscribe(title => {
			this.navTitleSubject.next(title);
		});
	}

	private get navTitleFromRouterEvents$(): Observable<string> {
		return this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd),
				map(() => this.activatedRoute),
				map(route => route.firstChild.firstChild), // Introducing auth or routing changes can break this.
				switchMap(route => route.data),
				map((data) => {
					console.log('Toolbar title is ', data.title);
					return data.title ? data.title : 'Missing title';
				})
			);
	}

}
