import { Component, Input } from '@angular/core';

@Component({
	selector: 'ma-commit-summary',
	templateUrl: './commit-summary.component.html',
	styleUrls: [ './commit-summary.component.scss' ]
})
export class CommitSummaryComponent {

	@Input()
	public gitInfo;

	constructor() { }
}
