import { TestBed } from '@angular/core/testing';

import { LoginFormService } from './login-form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('LoginFormService', () => {
  let service: LoginFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [LoginFormService]
    });
    service = TestBed.inject(LoginFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should give only valid login form values', () => {
    const serviceSpy = subscribeSpyTo(service.validValue$);
    service.patch({ username: '', password: '' });
    service.patch({ username: '', password: 'password' });
    service.patch({ username: 'a.b@c.d', password: '' });
    service.patch({ username: 'a.b@c.d', password: 'password' });
    service.patch({ username: '', password: '' });
    expect(serviceSpy.getValues()).toEqual([{ username: 'a.b@c.d', password: 'password' }]);
  });
});
