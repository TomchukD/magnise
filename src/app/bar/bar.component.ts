import { Component } from '@angular/core';
import { MatFormField, MatOption, MatSelect } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { RepositoryMarket } from 'app/sahred/repository';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'app-bar',
    standalone: true,
    imports: [
        MatSelect,
        MatButtonModule,
        MatFormField,
        MatOption,
        ReactiveFormsModule,
        AsyncPipe,
        MatInput
    ],
    templateUrl: './bar.component.html',
    styleUrl: './bar.component.scss'
})
export class BarComponent {

    public selectControl = new FormControl<string | null>('BTC/USD');

    constructor(private repositoryMarket: RepositoryMarket) {
    }

    public get isDisabled(): boolean {
        return !this.selectControl.value;
    }

    public subscribe(): void {
        this.repositoryMarket.marketData.next(
            this.selectControl.value!
        );
    }

}
