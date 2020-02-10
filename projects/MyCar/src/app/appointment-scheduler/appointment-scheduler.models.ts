import { DynamicFormData } from './appointment-scheduler.component';
import { VehicleBase } from '../my-vehicles/vehicle.models';

export interface AppointmentScheduleResponse {
	/**
	 * Note: ISO string from Date object
	 */
	daysAvailable: Date[];

	/**
	 * Text-based description of how to schedule
	 */
	guidelines: string[]; // TODO DJC discuss with dad,

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
