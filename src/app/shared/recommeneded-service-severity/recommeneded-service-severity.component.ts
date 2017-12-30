import { Component, Input } from '@angular/core';

export enum RecommendedServiceSeverityStringsNumbers {
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
	selector: 'ma-recommeneded-service-severity',
	templateUrl: './recommeneded-service-severity.component.html',
	styleUrls: [ './recommeneded-service-severity.component.scss' ]
})
export class RecommenededServiceSeverityComponent {

	@Input()
	public severity: RecommendedServiceSeverityStrings;

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
			case RecommendedServiceSeverityStrings.Immediate:
				classes.immediate = true;
				break;
			case RecommendedServiceSeverityStrings.Moderate:
				classes.moderate = true;
				break;
			case RecommendedServiceSeverityStrings.ShouldWatch:
				classes[ 'should-watch' ] = true;
				break;
			case RecommendedServiceSeverityStrings.Maintenance:
				classes.maintenance = true;
				break;
			case RecommendedServiceSeverityStrings.Notes:
				classes.notes = true;
				break;
			case RecommendedServiceSeverityStrings.Ok:
				classes.ok = true;
				break;
			default:
				break;
		}

		return classes;
	}
}
