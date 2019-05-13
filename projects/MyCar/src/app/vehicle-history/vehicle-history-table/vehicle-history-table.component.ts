import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { VehicleHistoryEntry } from '../vehicle-history.models';

@Component({
	selector: 'ma-vehicle-history-table',
	templateUrl: './vehicle-history-table.component.html',
	styleUrls: [ './vehicle-history-table.component.scss' ],
	encapsulation: ViewEncapsulation.Emulated
})
export class VehicleHistoryTableComponent implements OnChanges {

	@Input()
	public displayedColumns = ['vehicle', 'date', 'odometer', 'description', 'amount'];

	@Input()
	public vehicleHistory: VehicleHistoryEntry[];

	public dataSource: MatTableDataSource<VehicleHistoryEntry>;

	constructor() {
	}

	public ngOnChanges(changeObj): void {
		this.dataSource = new MatTableDataSource<VehicleHistoryEntry>(this.vehicleHistory);
	}
}
