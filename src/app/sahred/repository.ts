import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RepositoryMarket {

    public marketData = new BehaviorSubject<string | null>(null);

}