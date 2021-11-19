import { CheeseValidators, SimpleFormService } from '@cheesecake-ui/utils/form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateCalendarCommand } from './create-calendar-facade.service';

export class CreateCalendarFormService extends SimpleFormService<CreateCalendarCommand> {

  readonly form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      name: ['', [Validators.required, CheeseValidators.notEmpty]],
      description: ['', [Validators.required, CheeseValidators.notEmpty]]
    });
  }

}
