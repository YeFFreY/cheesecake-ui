import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheeseValidators, SimpleFormService } from '@cheesecake-ui/utils/form';
import { CreateActivityOperationCommand } from './create-activity-operation-facade.service';


export class CreateActivityOperationFormService extends SimpleFormService<Omit<CreateActivityOperationCommand,'activityId'>>{
  readonly form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      type: ['', [Validators.required, CheeseValidators.notEmpty]],
      description: ['', [Validators.required, CheeseValidators.notEmpty]]
    })
  }

}
