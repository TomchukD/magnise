import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL, HEADER } from 'app/service/base_api';

@Injectable({
    providedIn: 'root'
})
export class BarService {

    private API_URL_PERIODS = `${ BASE_URL }/exchangerate`;

    constructor(private http: HttpClient) {
    }

    public getData(params: string): Observable<any> {
        return this.http.get<any>(`${ this.API_URL_PERIODS }/${ params }`, { headers: HEADER });
    }
}