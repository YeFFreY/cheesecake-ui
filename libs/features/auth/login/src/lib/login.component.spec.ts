import { LoginComponent } from './login.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { LoginFacadeService } from './login-facade.service';
import { ApiService } from '@cheesecake-ui/core/api';
import { SessionService } from '@cheesecake-ui/core-auth';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let spectator: Spectator<LoginComponent>;
  const createComponent = createComponentFactory({
    component: LoginComponent,
    imports:[ReactiveFormsModule, RouterTestingModule],
    componentProviders:[LoginFacadeService],
    mocks: [ApiService, SessionService, ActivatedRoute]
  });

  beforeEach(() => spectator = createComponent());


  it('should display the form to login', () => {
    expect(spectator.query('#username')).toHaveValue('');
    expect(spectator.query('#password')).toHaveValue('');
    expect(spectator.query('#password')).toHaveAttribute('type', 'password');
    expect(spectator.query('button[type="submit"]')).toExist();
  });

});
