import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CheeseValidators, FormService } from '@cheesecake-ui/utils/form';
import { Credentials } from './login.domain';

export class LoginFormService implements FormService<Credentials> {
  public readonly form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CheeseValidators.notEmpty, Validators.minLength(8)]]
    });
  }

  get validValue$(): Observable<Credentials> {
    return this.form.valueChanges.pipe(
      filter(() => this.form.valid)
    );
  }

  patch(value: Credentials) {
    this.form.patchValue(value);
  }
}
