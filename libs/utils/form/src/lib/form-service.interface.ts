import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface FormService<T> {
  readonly form: FormGroup;
  readonly validValue$: Observable<T>;
  patch: (data: T) => void;
}

export abstract class SimpleFormService<T> implements FormService<T> {

  readonly abstract form: FormGroup;

  get values$(): Observable<T> {
    return this.form.valueChanges;
  }

  get validValue$(): Observable<T> {
    return this.values$.pipe(
      filter(() => this.form.valid)
    );
  }

  get validForm(): boolean {
    return this.form.valid;
  }

  patch(data: T): void {
    this.form.patchValue(data);
  }
}
