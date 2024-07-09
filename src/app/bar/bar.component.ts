import { Component } from '@angular/core';
import { MatFormField, MatOption, MatSelect } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CoinDataService } from 'app/service/coin.data.service';
import { BarData } from 'app/bar/barData.interface';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-bar',
    standalone: true,
    imports: [
        MatSelect,
        MatButtonModule,
        MatFormField,
        MatOption,
        ReactiveFormsModule,
        AsyncPipe
    ],
    templateUrl: './bar.component.html',
    styleUrl: './bar.component.scss'
})
export class BarComponent {

    public dataSelect = new BehaviorSubject<BarData[]>([]);

    public selectControl = new FormControl<BarData | null>(null);

    constructor(private dataService: CoinDataService) {
        this.dataService.getData().subscribe((data) => {
            this.dataSelect.next(this.transformData(data));
            this.selectControl.setValue(this.dataSelect.value[0]);
        });
    }

    public subscribe(): void {
        console.log(this.selectControl.value);
    }

    private transformData(data: any[]): BarData[] {
        return data.map(({ asset_id, name }) => {
            return {
                name,
                asset_id
            };
        });
    };

}
