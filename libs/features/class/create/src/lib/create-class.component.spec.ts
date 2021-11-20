import { CreateClassComponent } from './create-class.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '@cheesecake-ui/core/api';
import { CreateClassFacadeService } from './create-class-facade.service';

describe('CreateClassComponent', () => {
  let spectator: Spectator<CreateClassComponent>;
  const createComponent = createComponentFactory({
    component: CreateClassComponent,
    imports: [ReactiveFormsModule, RouterTestingModule],
    componentProviders: [CreateClassFacadeService],
    mocks: [ApiService]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.query('#name')).toHaveValue('');
    expect(spectator.query('#description')).toHaveValue('');
    expect(spectator.query('button[type="submit"]')).toExist();
  });
});
