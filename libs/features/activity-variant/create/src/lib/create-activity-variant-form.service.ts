import { Injectable } from '@angular/core';
import { CheeseValidators, SimpleFormService } from '@cheesecake-ui/utils/form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateActivityVariantCommand } from './create-activity-variant-facade.service';

@Injectable({
  providedIn: 'root'
})
export class CreateActivityVariantFormService extends SimpleFormService<Omit<CreateActivityVariantCommand,'activityId'>> {
  readonly form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      name: ['', [Validators.required, CheeseValidators.notEmpty]],
      description: ['', [Validators.required, CheeseValidators.notEmpty]]
    })
  }
}
