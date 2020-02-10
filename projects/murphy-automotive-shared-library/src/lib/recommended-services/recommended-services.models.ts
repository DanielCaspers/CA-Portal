export interface RecommendedService {
	Id: string;
	Description: string;
	OrderId: string;
	LastModifiedDate: Date;
	TechnicianId: string;
	AppLink: string;
	EstimateId: string;
	NotificationCount: number;

	/**
	 * The urgency with which the service should be addressed.
	 */
	Severity: number;

	/**
	 * String consisting of 3 digits to represent the company results being viewed.
	 */
	CompanyNumber: string;
}
