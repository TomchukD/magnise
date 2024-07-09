import { Component } from '@angular/core';
import { MatFormField, MatOption, MatSelect } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-bar',
    standalone: true,
    imports: [
        MatSelect,
        MatButtonModule,
        MatFormField,
        MatOption,
        ReactiveFormsModule
    ],
    templateUrl: './bar.component.html',
    styleUrl: './bar.component.scss'
})
export class BarComponent {

    public dataSelect = ['bit', 'cur'];

    public selectControl = new FormControl<string | null>(null);
    
    public subscribe(): void {
        console.log(this.selectControl.value);
    }

}
