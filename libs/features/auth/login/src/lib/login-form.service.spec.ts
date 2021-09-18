import { TestBed } from '@angular/core/testing';

import { LoginFormService } from './login-form.service';
import { TestScheduler } from 'rxjs/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginFormService', () => {
  let service: LoginFormService;
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [LoginFormService]
    });
    service = TestBed.inject(LoginFormService);
    scheduler = new TestScheduler(((actual, expected) => expect(actual).toEqual(expected)));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should give only valid login form values', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const inputs: { [key: string]: () => void } = {
        a: () => service.patch({ email: '', password: '' }),
        b: () => service.patch({ email: '', password: 'password' }),
        c: () => service.patch({ email: 'a.b@c.d', password: '' }),
        d: () => service.patch({ email: 'a.b@c.d', password: 'password' }),
        e: () => service.patch({ email: '', password: '' })
      };
      cold('abcd').subscribe(v => {
        inputs[v]();
      });
      expectObservable(service.value$).toBe('---d', { d: { email: 'a.b@c.d', password: 'password' } });
    });
  });
});
