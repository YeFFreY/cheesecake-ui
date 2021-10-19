import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheeseValidators, FormService } from '@cheesecake-ui/utils/form';
import { CreateActivityCommand } from './create-activity.domain';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export class CreateActivityFormService implements FormService<CreateActivityCommand> {

  readonly form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, CheeseValidators.notEmpty]],
      description: ['', [Validators.required, CheeseValidators.notEmpty]]
    })
  }

  get validValue$(): Observable<CreateActivityCommand> {
    return this.form.valueChanges.pipe(
      filter(() => this.form.valid)
    );
  }

  patch(data: CreateActivityCommand): void {
    this.form.patchValue(data);
  }
}
