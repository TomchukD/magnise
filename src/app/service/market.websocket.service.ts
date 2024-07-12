import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { webSocket } from 'rxjs/webSocket';
import { API_KEY } from 'app/service/base_api';
import { Observable } from 'rxjs';
import { MarketResponse } from 'app/service/market.response.interface';

@Injectable({
    providedIn: 'root'
})
export class MarketWebsocketService {

    private socket$: WebSocketSubject<any> = webSocket('wss://ws.coinapi.io/v1/');

    constructor() {
    }

    public connect(asset_id: string): void {

        this.socket$.next({
            type: 'hello',
            apikey: API_KEY,
            heartbeat: false,
            subscribe_data_type: ['trade'],
            subscribe_filter_asset_id: [asset_id],
            subscribe_update_limit_ms_quote: 2000
        });


        this.socket$.subscribe({
            error: err => {
                console.log('err', err);
            }
        });
    }

    public getMessages(): Observable<MarketResponse> {
        return this.socket$.asObservable();
    }

    public sendMessage(asset_id: string): void {
        this.socket$.next(
            {
                type: 'hello',
                apikey: API_KEY,
                heartbeat: false,
                subscribe_data_type: ['trade'],
                subscribe_filter_asset_id: [asset_id]
                ,
                subscribe_update_limit_ms_quote: 2000
            }
        );
    }

    public close(): void {
        this.socket$.complete();
    }

}
