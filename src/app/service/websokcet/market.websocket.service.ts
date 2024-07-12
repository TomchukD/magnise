import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { MarketResponse } from 'app/service/market.response.interface';
import { baseParam } from 'app/service/websokcet/base.param';

@Injectable({
    providedIn: 'root'
})
export class MarketWebsocketService {

    private socket$: WebSocketSubject<any> = webSocket('wss://ws.coinapi.io/v1/');

    constructor() {
    }

    public connect(asset_id: string): void {

        this.socket$.next({
            ...baseParam,
            subscribe_filter_asset_id: [asset_id]
        });
    }

    public getMessages(): Observable<MarketResponse> {
        return this.socket$.asObservable();
    }

    public sendMessage(asset_id: string): void {
        this.socket$.next(
            {
                ...baseParam,
                subscribe_filter_asset_id: [asset_id]
            }
        );
    }

    public close(): void {
        this.socket$.complete();
    }

}
