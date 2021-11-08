import { CheeseValidators, SimpleFormService } from '@cheesecake-ui/utils/form';
import { CreateSkillCommand } from './create-skill-facade.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class CreateSkillFormService extends SimpleFormService<CreateSkillCommand> {

  readonly form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      name: ['', [Validators.required, CheeseValidators.notEmpty]],
      description: ['', [Validators.required, CheeseValidators.notEmpty]]
    });
  }
}
