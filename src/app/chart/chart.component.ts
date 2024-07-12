import { Component, OnInit, ViewChild } from '@angular/core';
import {
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexTitleSubtitle,
    ApexXAxis,
    NgApexchartsModule
} from 'ng-apexcharts';
import { RepositoryMarket } from 'app/sahred/repository';
import { ChartHistoryService } from 'app/service/chartHistory.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import moment from 'moment';
import { ChartHistoryResponse } from 'app/service/chart.response.interface';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
    dataLabels: ApexDataLabels
};

@Component({
    selector: 'chart',
    standalone: true,
    imports: [
        NgApexchartsModule,
        MatButtonToggleModule,
        ReactiveFormsModule
    ],
    templateUrl: './chart.component.html',
    styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {

    @ViewChild('chart') chart!: ChartComponent;

    public chartOptions: Partial<ChartOptions> = {
        series: [
            {
                name: 'BTC/USD',
                data: [1, 2, 3, 4, 5]
            }
        ],
        chart: {
            type: 'line',
            height: 350
        },
        title: {
            text: 'Historical Prices'
        },
        xaxis: {
            categories: []
        },
        dataLabels: {
            enabled: false
        }
    };

    public periodData = new FormControl<string>('1HRS', { nonNullable: true });

    constructor(private chartHistoryService: ChartHistoryService, private repositoryMarket: RepositoryMarket) {
    }

    ngOnInit(): void {
        this.repositoryMarket.marketData.subscribe(data => {
            if (!data) {
                this.periodData.disable();
                return;
            }
            this.periodData.enable();

        });

        this.periodData.valueChanges.subscribe(period => {
            this.updateChartData(period);

        });
    }

    private updateChartData(period: string): void {
        const endDate = moment().toISOString();
        const startDate = this.getStartDate(period);
        const exchange = this.repositoryMarket.marketData.value!.replace('/', '_');
        let body: { exchange: string, period: string, startDate?: string, endDate?: string } = {
            exchange,
            period: period,
            startDate,
            endDate

        };
        if (period === '7DAY') {
            delete body.startDate;
            delete body.endDate;

        }
        this.chartHistoryService.getData(body).subscribe((chartData => {
            const xaxis = this.getXaxis(chartData);
            const formatData = chartData.length === 24 ? 'HH:mm' : 'YYYY-MM-DD';
            this.chartOptions = {
                ...this.chartOptions,
                xaxis: {
                    categories: xaxis,
                    labels: {
                        show: true,
                        rotate: 0,
                        formatter: (v) => {
                            return moment(v).format(formatData);
                        }

                    }

                },
                series: [{
                    name: 'BTC/USD',
                    data: chartData.map(v => v.price_close)
                }]
            };
        }));
    }

    private getStartDate(period: string): string {
        let amount: number;
        let unit: moment.unitOfTime.DurationConstructor;

        switch (period) {
            case '7DAY':
                amount = 7;
                unit = 'days';
                break;
            case '1HRS':
            default:
                amount = 1;
                unit = 'days';
                break;
        }

        return moment().subtract(amount, unit).toISOString();
    }

    public getXaxis(date: ChartHistoryResponse[]): string[] {
        return date.map(((v: any) => {
            return v.time_period_start;
        }));
    }

}

