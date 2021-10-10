import { TestBed } from '@angular/core/testing';

import { AuthStateService } from './auth-state.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TestPlaceHolderComponent } from '@cheesecake-ui/test/mock';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('AuthStateService', () => {
  let service: AuthStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: TestPlaceHolderComponent },
          { path: 'app', component: TestPlaceHolderComponent }
        ])
      ]
    });
    service = TestBed.inject(AuthStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be initially not authenticated', () => {
    const authenticatedSpy = subscribeSpyTo(service.authenticated$);
    expect(authenticatedSpy.getValues()).toEqual([false]);
  });

  it('should signal authenticated as true when signed in', () => {
    const authenticatedSpy = subscribeSpyTo(service.authenticated$);
    service.signedIn();
    expect(authenticatedSpy.getValues()).toEqual([false, true]);
  });

  it('should signal authenticated as false after signing out', () => {
    const authenticatedSpy = subscribeSpyTo(service.authenticated$);
    service.signedIn();
    service.signedOut();
    expect(authenticatedSpy.getValues()).toEqual([false, true, false]);
  });
});
