import { Component } from '@angular/core';
import { WrapperComponent } from 'app/wrapper/wrapper.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [WrapperComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
}
