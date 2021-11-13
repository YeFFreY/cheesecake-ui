import { TestBed } from '@angular/core/testing';

import { CreateEquipmentFormService } from './create-equipment-form.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('CreateEquipmentFormService', () => {
  let service: CreateEquipmentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule]
    });
    service = new CreateEquipmentFormService(TestBed.inject(FormBuilder));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should give only valid equipment form values', () => {
    const serviceSpy = subscribeSpyTo(service.validValue$);
    service.patch({ name: '', description: '' });
    service.patch({ name: '', description: 'description' });
    service.patch({ name: 'a name', description: '' });
    service.patch({ name: 'a name', description: 'description' });
    service.patch({ name: '', description: '' });
    expect(serviceSpy.getValues()).toEqual([{ name: 'a name', description: 'description' }]);
  });
});
