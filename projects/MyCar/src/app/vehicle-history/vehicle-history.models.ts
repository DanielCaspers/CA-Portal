export interface VehicleHistoryEntry {
	CompletionDate: Date;
	Description: string[];
	OrderId: string;
	Odometer: number;
	InvoiceLink: string;

	// TODO NYI BY API
	amount: number;
	year: string;
	make: string;
	model: string;
	color: string;
}
