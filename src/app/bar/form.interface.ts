import { FormControl } from '@angular/forms';

export interface barFormGroup {
    select: FormControl<string | null>;
    subscribe: FormControl<void>;
}