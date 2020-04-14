import { DynamicFormData } from './appointment-scheduler.component';
import { VehicleBase } from '../my-vehicles/vehicle.models';

export interface AppointmentScheduleResponse {
	/**
	 * Note: ISO string from Date object
	 */
	daysAvailable: Date[];

	/**
	 * Text-based bullet list describing reasons why one should not schedule via the app
	 */
	reasonsToAvoidScheduling: string[];

	/**
	 * Text used for the "Renting a car?" step
	 */
	rentalCarBodyText: string;

	/**
	 * Main body text used for the "Which day?" step
	 */
	daySelectionBodyText: string;

	/**
	 * Caption text used for the "Which day?" step
	 */
	daySelectionCaptionText: string;

	problemDescriptions: DynamicFormData[];
}

export interface AppointmentSchedulerRequest extends VehicleBase {
	ScheduleDate: Date;
	WorkDescription: string[];
	AppointmentType: AppointmentType;
}

export enum AppointmentType {
	NewVehicle = 'New',
	ExistingVehicle = 'Existing'
}
