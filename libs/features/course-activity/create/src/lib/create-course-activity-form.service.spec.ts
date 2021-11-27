import { TestBed } from '@angular/core/testing';

import { CreateCourseActivityFormService } from './create-course-activity-form.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('CreateCourseActivityFormService', () => {
  let service: CreateCourseActivityFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule]
    });
    service = new CreateCourseActivityFormService(TestBed.inject(FormBuilder));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should give only valid course form values', () => {
    const serviceSpy = subscribeSpyTo(service.validValue$);
    service.patch({ courseSectionTypeId: '', activityId: '' });
    service.patch({ courseSectionTypeId: 'WARM_UP', activityId: '' });
    service.patch({ courseSectionTypeId: '', activityId: '1' });
    service.patch({ courseSectionTypeId: '', activityId: '' });
    service.patch({ courseSectionTypeId: 'WARM_UP', activityId: '1' });
    service.patch({ courseSectionTypeId: 'WARM_UP', activityId: '' });
    service.patch({ courseSectionTypeId: '', activityId: '1' });
    service.patch({ courseSectionTypeId: '', activityId: '' });
    expect(serviceSpy.getValues()).toEqual([{ courseSectionTypeId: 'WARM_UP', activityId: '1' }]);
  });
});
