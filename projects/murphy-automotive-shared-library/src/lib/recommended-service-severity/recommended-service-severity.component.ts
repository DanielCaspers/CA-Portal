import { Component, Input } from '@angular/core';

export enum RecommendedServiceSeverityNumbers {
	Immediate = 1 as any,
	Moderate = 2 as any,
	ShouldWatch = 3 as any,
	Maintenance = 4 as any,
	Notes = 5 as any,
	Ok = 10 as any,
	NotApplicable = 10 as any,
	Unknown = 12 as any
}

export enum RecommendedServiceSeverityStrings {
	Immediate = 'Immediate' as any,
	Moderate = 'Moderate' as any,
	ShouldWatch = 'ShouldWatch' as any,
	Maintenance = 'Maintenance' as any,
	Notes = 'Notes' as any,
	Ok = 'Ok' as any,
	NotApplicable = 'NotApplicable' as any,
	Unknown = 'Unknown' as any
}

@Component({
	selector: 'ma-recommended-service-severity',
	templateUrl: './recommended-service-severity.component.html',
	styleUrls: [ './recommended-service-severity.component.scss' ]
})
export class RecommendedServiceSeverityComponent {

	@Input()
	public severity: RecommendedServiceSeverityNumbers;

	@Input()
	public showHelpText = true;

	public immediate = RecommendedServiceSeverityNumbers.Immediate;
	public moderate = RecommendedServiceSeverityNumbers.Moderate;
	public shouldWatch = RecommendedServiceSeverityNumbers.ShouldWatch;
	public maintenance = RecommendedServiceSeverityNumbers.Maintenance;
	public notes = RecommendedServiceSeverityNumbers.Notes;
	public ok = RecommendedServiceSeverityNumbers.Ok;

	constructor() {
	}

	public getIconColor(): { [className: string]: boolean } {
		const classes = {
			immediate: false,
			moderate: false,
			'should-watch': false,
			maintenance: false,
			notes: false,
			ok: false,
			'not-applicable': false,
			unknown: false
		};

		switch (this.severity) {
			case RecommendedServiceSeverityNumbers.Immediate:
				classes.immediate = true;
				break;
			case RecommendedServiceSeverityNumbers.Moderate:
				classes.moderate = true;
				break;
			case RecommendedServiceSeverityNumbers.ShouldWatch:
				classes[ 'should-watch' ] = true;
				break;
			case RecommendedServiceSeverityNumbers.Maintenance:
				classes.maintenance = true;
				break;
			case RecommendedServiceSeverityNumbers.Notes:
				classes.notes = true;
				break;
			case RecommendedServiceSeverityNumbers.Ok:
				classes.ok = true;
				break;
			default:
				break;
		}

		return classes;
	}
}
