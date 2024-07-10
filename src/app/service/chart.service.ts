import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { webSocket } from 'rxjs/webSocket';
import { API_KEY } from 'app/service/base_api';

@Injectable({
    providedIn: 'root'
})
export class ChartService {

    private socket$: WebSocketSubject<any> = webSocket('wss://ws.coinapi.io/v1/');

    constructor() {
    }

    public connect(asset_id: string): void {
        this.socket$.next({
            'type': 'hello',
            'apikey': API_KEY,
            'heartbeat': false,
            'subscribe_data_type': ['trade'],
            'subscribe_filter_asset_id': [asset_id]
        });

        this.socket$.subscribe({
            next: (message) => {
                console.log('message', message);
            },
            error: err => {
                console.log('err', err);
            },
            complete: () => {
            }
        });
    }

    public getMessages() {
        return this.socket$.asObservable();
    }

    public sendMessage(asset_id: string): void {
        this.socket$.next({ 'subscribe_filter_asset_id': [asset_id] });
    }

    public close(): void {
        this.socket$.complete();
    }
}
