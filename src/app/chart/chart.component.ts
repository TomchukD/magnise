import { Component, OnInit } from '@angular/core';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { ChartService } from 'app/service/chart.service';
import { RepositoryMarket } from 'app/sahred/repository';


@Component({
    selector: 'chart',
    standalone: true,
    imports: [
        NgApexchartsModule
    ],
    templateUrl: './chart.component.html',
    styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {

    public chartOptions: ApexOptions = {
        series: [
            {
                name: 'Desktops',
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
            }
        ],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Product Trends by Month',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            }
        },
        xaxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep'
            ]
        }
    };


    constructor(private chartService: ChartService, private repositoryMarket: RepositoryMarket) {
    }

    ngOnInit(): void {
        this.repositoryMarket.marketData.pipe().subscribe(data => {
            if (!data) return;
            this.chartService.connect(data);
        });

        this.chartService.getMessages().subscribe({
                next: (message) => {
                    console.log(message);
                },
                error: (error) => {
                    console.error('Error:', error);
                }
            }
        );
        setTimeout(() => {
            this.chartService.close();
        }, 1000);
    }

}

