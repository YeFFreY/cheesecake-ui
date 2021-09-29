import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

import { LoginFacadeService } from './login-facade.service';
import { AuthStateService } from '@cheesecake-ui/core-auth';
import { of, throwError } from 'rxjs';
import { ApiService, invalidRequest } from '@cheesecake-ui/core/api';
import { HttpErrorResponse } from '@angular/common/http';


describe('LoginFacadeService', () => {
  let service: LoginFacadeService;
  let authState: AuthStateService;
  const api = { sendQuery: jest.fn(), sendCommand: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: ApiService,
          useValue: api
        },
        LoginFacadeService,
        AuthStateService
      ]
    });
    service = TestBed.inject(LoginFacadeService);
    authState = TestBed.inject(AuthStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should mark as authenticated when credentials received and submitted', () => {
    const signedInFn = jest.spyOn(authState, 'signedIn');
    const vmSpy = subscribeSpyTo(service.vm$);

    api.sendCommand = jest.fn(() => of({}))

    service.updateCredentials({ email: 'a.b@c.d', password: 'password'});
    service.submit();

    expect(vmSpy.getValues()).toEqual([{ authenticated: false, errors: null }, { authenticated: true, errors: null }]);
    expect(signedInFn).toHaveBeenCalledTimes(1);
  });

  it('should not mark as authenticated when invalid request returned', () => {
    const signedInFn = jest.spyOn(authState, 'signedIn');
    const vmSpy = subscribeSpyTo(service.vm$);

    api.sendCommand = jest.fn(() => throwError(invalidRequest(new HttpErrorResponse({}))))

    service.updateCredentials({ email: 'a.b@c.d', password: 'password'});
    service.submit();

    expect(vmSpy.getValues()).toEqual([{ authenticated: false, errors: null }, {authenticated: false, errors: 'invalid request'}]);
    expect(signedInFn).toHaveBeenCalledTimes(0);
  });
});
