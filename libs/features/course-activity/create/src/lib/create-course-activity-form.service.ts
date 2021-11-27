import { SimpleFormService } from '@cheesecake-ui/utils/form';
import { CreateCourseActivityCommand } from './create-course-activity-facade.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class CreateCourseActivityFormService extends SimpleFormService<Omit<CreateCourseActivityCommand, 'courseId'>> {

  readonly form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      activityId: ['', [Validators.required]],
      courseSectionTypeId: ['', [Validators.required]]
    });
  }
}
