import { DynamicFormData } from './appointment-scheduler.component';

export interface AppointmentScheduleResponse {
	/**
	 * Note: ISO string from Date object
	 */
	daysAvailable: Date[],

	/**
	 * Text-based description of how to schedule
	 */
	guidelines: string[] // TODO DJC discuss with dad,

	problemDescriptions: DynamicFormData[]
}
