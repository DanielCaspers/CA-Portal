import {
	RecommendedService
} from 'murphy-automotive-shared-library';

export interface VehicleBase {
	year: string | number;
	make: string;
	model: string;
	license: string;
	color: string;
	engine: string;
	transmission: string;
	vehicleID: string;
}

export interface VehicleOverview extends VehicleBase {
	recommendedServiceSeverity: number;
	recommendedServices: RecommendedService[];
	aggregateSeverity: number;
	nextOilChangeOdometer: number;
	nextOilChangeDate: Date;

	/**
	 * Number greater than or equal to 0 representing the amount
	 * of the vehicle's oil life expected to be consumed
	 * based on the last oil change performed.
	 * This can exceed 100% when the user exceeds their
	 * recommended oil change service interval.
	 */
	estimatedOilLifeConsumedPercentage: number;
}
