import { CreateActivityComponent } from './create-activity.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateActivityFacadeService } from './create-activity-facade.service';
import { ApiService } from '@cheesecake-ui/core/api';

describe('CreateActivityComponent', () => {
  let spectator: Spectator<CreateActivityComponent>;
  const createComponent = createComponentFactory({
    component: CreateActivityComponent,
    imports:[ReactiveFormsModule, RouterTestingModule],
    componentProviders:[CreateActivityFacadeService],
    mocks:[ApiService]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.query('#name')).toHaveValue('');
    expect(spectator.query('#description')).toHaveValue('');
    expect(spectator.query('button[type="submit"]')).toExist();

  });
});
