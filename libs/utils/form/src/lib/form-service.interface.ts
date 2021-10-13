import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

export interface FormService<T> {
  readonly form: FormGroup;
  readonly validValue$: Observable<T>;
  patch: (data: T) => void;
}
