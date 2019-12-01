import {
	AfterViewInit,
	Component,
	NgZone,
	OnInit,
	OnDestroy,
	ViewEncapsulation
} from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_frozen from '@amcharts/amcharts4/themes/frozen';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { AccountHttpService } from '../account-http.service';
import { first } from 'rxjs/operators';

am4core.useTheme(am4themes_frozen);
am4core.useTheme(am4themes_animated);

@Component({
	selector: 'ma-vip-rewards',
	templateUrl: './vip-rewards.component.html',
	styleUrls: [ './vip-rewards.component.scss' ],
	encapsulation: ViewEncapsulation.Emulated
})
export class VipRewardsComponent implements OnInit, AfterViewInit, OnDestroy {

	private chart: am4charts.GaugeChart;

	public vipRewardsPoints: number;

	private readonly maxRewardsPoints = 10000;
	private readonly chartAnimationEasingInMs = 1000;

	constructor(
		private accountHttpService: AccountHttpService,
		private zone: NgZone
	) {

	}

	public ngOnInit(): void {
		this.accountHttpService.getAccount()
			.pipe(first())
			.subscribe((account) => {
				this.vipRewardsPoints = account.loyaltyAccount.vipPointBalance;
			});
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.zone.runOutsideAngular(() => {
				this.configureSpeedometerChart();
			});
		});
	}

	public ngOnDestroy(): void {
		this.zone.runOutsideAngular(() => {
			if (this.chart) {
				this.chart.dispose();
			}
		});
	}

	private configureSpeedometerChart(): void {
		let chart = am4core.create('chartdiv', am4charts.GaugeChart);
		chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

		chart.innerRadius = -25;
		// chart.cursor = new am4charts.RadarCursor();

		let axis = chart.xAxes.push(new am4charts.ValueAxis() as any);
		axis.min = 0;
		axis.max = this.maxRewardsPoints;
		axis.strictMinMax = true;
		axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor('background');
		axis.renderer.grid.template.strokeOpacity = 0.3;
		axis.renderer.minGridDistance = 100; // Used to determine label spacing
		this.configureRanges(axis);

		let hand = chart.hands.push(new am4charts.ClockHand());

		// using chart.setTimeout method as the timeout will be disposed together with a chart
		chart.setTimeout(() => this.randomValue(hand), this.chartAnimationEasingInMs / 2);
	}

	private configureRanges(axis: am4charts.ValueAxis): void {
		let colorSet = new am4core.ColorSet();

		let range0 = axis.axisRanges.create();
		range0.value = 0;
		range0.endValue = 400;
		range0.axisFill.fillOpacity = 1;
		range0.axisFill.fill = colorSet.getIndex(0);
		range0.axisFill.zIndex = - 1;

		let range1 = axis.axisRanges.create();
		range1.value = 400;
		range1.endValue = 1000;
		range1.axisFill.fillOpacity = 1;
		range1.axisFill.fill = colorSet.getIndex(1);
		range1.axisFill.zIndex = -1;
		axis.hoverable = true;

		// range1.grid.stroke = am4core.color('#396478');
		// range1.grid.strokeWidth = 2;
		// range1.grid.strokeOpacity = 1;
		// range1.label.inside = true;
		// range1.label.text = 'Ultimate car wash';
		// range1.label.fill = range1.grid.stroke;
		// //range.label.align = 'right';
		// range1.label.verticalCenter = 'bottom';


		let range2 = axis.axisRanges.create();
		range2.value = 1000;
		range2.endValue = 1250;
		range2.axisFill.fillOpacity = 1;
		range2.axisFill.fill = colorSet.getIndex(2);
		range2.axisFill.zIndex = -1;

		let range3 = axis.axisRanges.create();
		range3.value = 1250;
		range3.endValue = 2500;
		range3.axisFill.fillOpacity = 1;
		range3.axisFill.fill = colorSet.getIndex(3);
		range3.axisFill.zIndex = -1;

		let range4 = axis.axisRanges.create();
		range4.value = 1250;
		range4.endValue = 2500;
		range4.axisFill.fillOpacity = 1;
		range4.axisFill.fill = colorSet.getIndex(4);
		range4.axisFill.zIndex = -1;

		let range5 = axis.axisRanges.create();
		range5.value = 2500;
		range5.endValue = this.maxRewardsPoints;
		range5.axisFill.fillOpacity = 1;
		range5.axisFill.fill = colorSet.getIndex(5);
		range5.axisFill.zIndex = -1;
	}

	private randomValue(hand): void {
		hand.showValue(this.vipRewardsPoints, this.chartAnimationEasingInMs, am4core.ease.cubicOut);
	}
}
