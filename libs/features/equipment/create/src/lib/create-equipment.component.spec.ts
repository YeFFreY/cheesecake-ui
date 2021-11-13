import { CreateEquipmentComponent } from './create-equipment.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '@cheesecake-ui/core/api';
import { CreateEquipmentFacadeService } from './create-equipment-facade.service';

describe('CreateEquipmentComponent', () => {
  let spectator: Spectator<CreateEquipmentComponent>;
  const createComponent = createComponentFactory({
    component: CreateEquipmentComponent,
    imports:[ReactiveFormsModule, RouterTestingModule],
    componentProviders:[CreateEquipmentFacadeService],
    mocks:[ApiService]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.query('#name')).toHaveValue('');
    expect(spectator.query('#description')).toHaveValue('');
    expect(spectator.query('button[type="submit"]')).toExist();
  });
});
