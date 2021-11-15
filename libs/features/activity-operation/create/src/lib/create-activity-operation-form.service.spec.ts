import { TestBed } from '@angular/core/testing';

import { CreateActivityOperationFormService } from './create-activity-operation-form.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('CreateActivityOperationFormService', () => {
  let service: CreateActivityOperationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule]
    });
    service = new CreateActivityOperationFormService(TestBed.inject(FormBuilder));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should give only valid operation form values', () => {
    const serviceSpy = subscribeSpyTo(service.validValue$);
    service.patch({ type: '', description: '' });
    service.patch({ type: '', description: 'description' });
    service.patch({ type: 'a name', description: '' });
    service.patch({ type: 'a name', description: 'description' });
    service.patch({ type: '', description: '' });
    expect(serviceSpy.getValues()).toEqual([{ type: 'a name', description: 'description' }]);
  });
});
