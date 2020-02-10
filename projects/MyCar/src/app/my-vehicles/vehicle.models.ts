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
}
