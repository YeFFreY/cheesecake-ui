import { CheeseValidators, SimpleFormService } from '@cheesecake-ui/utils/form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateEquipmentCommand } from './create-equipment-facade.service';

export class CreateEquipmentFormService extends SimpleFormService<CreateEquipmentCommand> {

  readonly form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      name: ['', [Validators.required, CheeseValidators.notEmpty]],
      description: ['', [Validators.required, CheeseValidators.notEmpty]]
    });
  }
}
