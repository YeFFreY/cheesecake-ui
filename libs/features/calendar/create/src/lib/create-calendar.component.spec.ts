import { CreateCalendarComponent } from './create-calendar.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '@cheesecake-ui/core/api';
import { CreateCalendarFacadeService } from './create-calendar-facade.service';

describe('CreateCalendarComponent', () => {
  let spectator: Spectator<CreateCalendarComponent>;
  const createComponent = createComponentFactory({
    component: CreateCalendarComponent,
    imports:[ReactiveFormsModule, RouterTestingModule],
    componentProviders:[CreateCalendarFacadeService],
    mocks:[ApiService]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.query('#name')).toHaveValue('');
    expect(spectator.query('#description')).toHaveValue('');
    expect(spectator.query('button[type="submit"]')).toExist();
  });
});
