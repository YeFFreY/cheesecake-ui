import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class LoginFormService {
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['bob@bob.com', Validators.required],
      password: ['secret77', Validators.required]
    });
  }

  get value$(): Observable<{ email: string, password: string}> {
    return this.form.valueChanges.pipe(
      filter(() => this.form.valid),
    )

  }

  patch(value: { password: string; email: string }) {
    this.form.patchValue(value);
  }
}
