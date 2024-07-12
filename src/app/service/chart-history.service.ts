import { Injectable } from '@angular/core';
import { BASE_URL, HEADER } from 'app/service/base-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChartHistoryResponse } from 'app/service/chart.response.interface';

@Injectable({
    providedIn: 'root'
})
export class ChartHistoryService {
    
    private API_URL = `${ BASE_URL }/ohlcv`;

    constructor(private http: HttpClient) {
    }

    public getData(param: {
        exchange: string,
        period: string,
        startDate?: string,
        endDate?: string
    }): Observable<ChartHistoryResponse[]> {
        let bodyUrl = `/BITSTAMP_SPOT_${ param.exchange }/history?period_id=${ param.period }`;
        if (param.startDate) {
            bodyUrl = bodyUrl + `&time_start=${ param.startDate }&time_end=${ param.endDate }`;
        }
        return this.http.get<ChartHistoryResponse[]>(`${ this.API_URL }${ bodyUrl }`, { headers: HEADER });
    }
}
