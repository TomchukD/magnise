import { Component, OnDestroy, OnInit } from '@angular/core';
import { RepositoryMarket } from 'app/shared/repository';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MarketWebsocketService } from 'app/service/websokcet/market.websocket.service';

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
export class MarketComponent implements OnInit, OnDestroy {

    public marketTitle: string | null = null;

    public marketPrice: number | null = null;

    public marketTime: string | null = null;

    private isSend = false;

    constructor(private repositoryMarket: RepositoryMarket, private marketWebsocketService: MarketWebsocketService) {
    }


    ngOnInit(): void {
        this.repositoryMarket.marketData.subscribe(market => {
            if (!market) {
                return;
            }

            if (!this.isSend) {
                this.marketWebsocketService.connect(market);
                this.marketTitle = market;
                this.isSend = !this.isSend;
                return;
            }
            this.marketWebsocketService.sendMessage(market);
            this.marketTitle = market;
        });

        this.marketWebsocketService.getMessages().subscribe({
            next: data => {
                this.marketPrice = data.price;
                this.marketTime = data.time_exchange;
            },
            error: err => {
                this.marketTitle = null;
                console.log(err);
            }
        });

    }

    ngOnDestroy(): void {
        this.marketWebsocketService.close();
    }


}
