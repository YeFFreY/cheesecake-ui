import { TestBed } from '@angular/core/testing';

import { CreateCourseFormService } from './create-course-form.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('CreateCourseFormService', () => {
  let service: CreateCourseFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule]
    });
    service = new CreateCourseFormService(TestBed.inject(FormBuilder));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should give only valid course form values', () => {
    const serviceSpy = subscribeSpyTo(service.validValue$);
    service.patch({ classId: '', start: '', end: '' });
    service.patch({ classId: 'bob', start: '', end: '' });
    service.patch({ classId: '', start: '01/01/2000', end: '' });
    service.patch({ classId: '', start: '', end: '01/01/2000' });
    service.patch({ classId: 'class', start: '01/01/2021', end: '01/01/2021' });
    service.patch({ classId: 'foo', start: '', end: '' });
    service.patch({ classId: '', start: '01/01/1900', end: '' });
    service.patch({ classId: '', start: '', end: '01/01/1900' });
    expect(serviceSpy.getValues()).toEqual([{ classId: 'class', start: '2020-12-31T23:00:00.000Z', end: '2020-12-31T23:00:00.000Z' }]);
  });
});
