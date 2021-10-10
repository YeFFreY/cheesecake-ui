import { TestBed } from '@angular/core/testing';

import { HeaderFacadeService } from './header-facade.service';
import { ApiService } from '@cheesecake-ui/core/api';
import { AuthStateService } from '@cheesecake-ui/core-auth';
import { of } from 'rxjs';

describe('HeaderFacadeService', () => {
  let service: HeaderFacadeService;
  const authState = { signedOut: jest.fn() };
  const api = { sendQuery: jest.fn(), sendCommand: jest.fn(() => of({})) };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApiService,
          useValue: api
        },
        {
          provide: AuthStateService,
          useValue: authState
        },
        HeaderFacadeService,

      ]
    });
    service = TestBed.inject(HeaderFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send command and call signout when calling logout', () => {
    const signedOutFn = jest.spyOn(authState, 'signedOut');
    const commandFn = jest.spyOn(api, 'sendCommand');

    service.logout();

    expect(signedOutFn).toHaveBeenCalledTimes(1);
    expect(commandFn).toHaveBeenCalledTimes(1);

  });
});
