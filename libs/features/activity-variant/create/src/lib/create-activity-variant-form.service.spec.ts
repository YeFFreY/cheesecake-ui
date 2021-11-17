import { TestBed } from '@angular/core/testing';

import { CreateActivityVariantFormService } from './create-activity-variant-form.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('CreateActivityVariantFormService', () => {
  let service: CreateActivityVariantFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule]
    });
    service = new CreateActivityVariantFormService(TestBed.inject(FormBuilder));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should give only valid variant form values', () => {
    const serviceSpy = subscribeSpyTo(service.validValue$);
    service.patch({ name: '', description: '' });
    service.patch({ name: '', description: 'description' });
    service.patch({ name: 'a name', description: '' });
    service.patch({ name: 'a name', description: 'description' });
    service.patch({ name: '', description: '' });
    expect(serviceSpy.getValues()).toEqual([{ name: 'a name', description: 'description' }]);
  });
});
