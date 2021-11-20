import { CheeseValidators, SimpleFormService } from '@cheesecake-ui/utils/form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateClassCommand } from './create-class-facade.service';

export class CreateClassFormService extends SimpleFormService<CreateClassCommand> {

  readonly form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      name: ['', [Validators.required, CheeseValidators.notEmpty]],
      description: ['', [Validators.required, CheeseValidators.notEmpty]]
    });
  }
}
