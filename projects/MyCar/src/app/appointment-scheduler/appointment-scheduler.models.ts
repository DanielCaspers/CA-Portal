export interface AppointmentScheduleResponse {
	/**
	 * Note: ISO string from Date object
	 */
	daysAvailable: string,

	/**
	 * Text-based description of how to schedule
	 */
	guidelines: string[] // TODO DJC discuss with dad,

	problemDescriptions: ProblemDescription[]
}

export interface ProblemDescription {

	/**
	 * The human-readable conditions which are likely to resonate with the customer
	 */
	desc: string[],

	/**
	 * The back end value for the condition to investigate or address
	 */
	category: string
}
