import { CheeseValidators, SimpleFormService } from '@cheesecake-ui/utils/form';
import { EditActivityCommand } from './edit-activity.domain';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class EditActivityFormService extends SimpleFormService<EditActivityCommand> {

  readonly form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      name: ['', [Validators.required, CheeseValidators.notEmpty]],
      description: ['', [Validators.required, CheeseValidators.notEmpty]]
    })
  }
}
