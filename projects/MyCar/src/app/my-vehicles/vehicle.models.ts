import {
	RecommendedService
} from 'murphy-automotive-shared-library';

export interface VehicleOverview {
	year: string;
	make: string;
	model: string;
	license: string;
	color: string;
	recommendedServiceSeverity: number;
	recommendedServices: RecommendedService[],
	aggregateSeverity: number;
	vehicleID: string;
}
