export class InspectionAccordionService {

	public static shouldExpand(inspectionItem): boolean {
		return (inspectionItem.Measurements && inspectionItem.Measurements.length > 0) ||
			(inspectionItem.CannedResponses && inspectionItem.CannedResponses.length > 0) ||
			(inspectionItem.Images && inspectionItem.Images.length > 0) ||
			!!inspectionItem.Note;
	}
}
