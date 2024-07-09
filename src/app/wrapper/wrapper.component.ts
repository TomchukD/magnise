import { Component } from '@angular/core';
import { BarComponent } from 'app/bar/bar.component';
import { ChartComponent } from 'app/chart/chart.component';
import { MarketComponent } from 'app/market/market.component';

@Component({
    selector: 'app-wrapper',
    standalone: true,
    imports: [
        BarComponent,
        ChartComponent,
        MarketComponent
    ],
    templateUrl: './wrapper.component.html',
    styleUrl: './wrapper.component.scss'
})
export class WrapperComponent {

}
