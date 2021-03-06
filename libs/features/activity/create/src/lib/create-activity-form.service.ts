import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheeseValidators, SimpleFormService } from '@cheesecake-ui/utils/form';
import { CreateActivityCommand } from './create-activity.domain';

export class CreateActivityFormService extends SimpleFormService<CreateActivityCommand> {

  readonly form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      name: ['', [Validators.required, CheeseValidators.notEmpty]],
      description: ['', [Validators.required, CheeseValidators.notEmpty]]
    })
  }

}
