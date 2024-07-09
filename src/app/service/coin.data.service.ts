import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CoinDataService {

    private API_URL = 'https://rest.coinapi.io/v1/assets';

    constructor(private http: HttpClient) {
    }

    public getData(): Observable<any> {
        const headers = new Headers({ 'X-CoinAPI-Key': '35F3F847-5438-4C61-A143-B32410F8AF15' });
        return this.http.get(this.API_URL, { headers: { 'X-CoinAPI-Key': '35F3F847-5438-4C61-A143-B32410F8AF15' } });
    }


}
