import { Component, OnInit } from '@angular/core';
import { MarketService } from 'app/service/market.service';
import { RepositoryMarket } from 'app/sahred/repository';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'app-market',
    standalone: true,
    imports: [
        DatePipe,
        CurrencyPipe
    ],
    templateUrl: './market.component.html',
    styleUrl: './market.component.scss'
})
export class MarketComponent implements OnInit {

    public marketTitle: string | null = null;

    public marketPrice: string | null = null;

    public marketTime: string | null = null;

    constructor(private repositoryMarket: RepositoryMarket, private marketService: MarketService) {
    }


    ngOnInit(): void {
        this.repositoryMarket.marketData.subscribe(v => {
            if (!v) return;
            this.marketTitle = v;
            this.updateMarket(v);
        });
    }

    private updateMarket(params: string): void {
        this.marketService.getData(params).subscribe(data => {
            this.marketPrice = String(data.rate);
            this.marketTime = data.time;
        });
    }
}
