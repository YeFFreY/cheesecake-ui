import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';

import { AuthStateService } from './auth-state.service';

describe('AuthStateService', () => {
  let service: AuthStateService;
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthStateService);
    scheduler = new TestScheduler(((actual, expected) => expect(actual).toEqual(expected)));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be initially not authenticated', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(service.authenticated$).toBe('a', { a: false });
    });
  });

  it('should signal authenticated as true when signed in', () => {
    scheduler.run(({ cold, expectObservable }) => {
      cold('a').subscribe(() => service.signedIn());
      expectObservable(service.authenticated$).toBe('a', { a: true });
    });
  });

  it('should signal authenticated as false after signing out', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const actions: { [key: string]: () => void } = { a: () => service.signedIn(), b: () => service.signedOut() };
      cold('ab').subscribe(v => {
        actions[v]();
      });
      expectObservable(service.authenticated$).toBe('ab', { a: true, b: false });
    });
  });
});
