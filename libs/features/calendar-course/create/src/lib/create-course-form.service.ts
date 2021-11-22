import { CheeseValidators, SimpleFormService } from '@cheesecake-ui/utils/form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateCourseCommand } from './create-course-facade.service';

export class CreateCourseFormService extends SimpleFormService<Omit<CreateCourseCommand,'calendarId'>>{
  readonly form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      classId: ['', [Validators.required]],
      start: ['', [Validators.required, CheeseValidators.notEmpty]],
      end: ['', [Validators.required, CheeseValidators.notEmpty]]
    })
  }


  mapper(value: Omit<CreateCourseCommand, "calendarId">): Omit<CreateCourseCommand, "calendarId"> {
    const startDate = new Date(value.start);
    const endDate = new Date(value.end);
    return {
      ...value,
      start: startDate.toString() != "Invalid Date" ? startDate.toISOString() : value.start,
      end: endDate.toString() != "Invalid Date" ? endDate.toISOString() : value.end,
    };
  }
}
