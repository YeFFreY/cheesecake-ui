import { SessionInterceptor } from './session.interceptor';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { SessionService } from './session.service';
import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { subscribeSpyTo } from '@hirez_io/observer-spy';


function mockError(status: number) {
  return {
    handle: jest.fn(() => throwError(
      new HttpErrorResponse({ status, error: { message: 'This is an error' } })))
  };
}

function mockOk() {
  return {
    handle: jest.fn(() => of(new HttpResponse({ status: 200,  body: { id: 'ok' } })))
  };
}

describe('SessionInterceptor', () => {
  let spectator: SpectatorService<SessionInterceptor>;
  const createService = createServiceFactory({
    service: SessionInterceptor,
    mocks: [SessionService]
  });

  beforeEach(() => spectator = createService());

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('shoud sign out and redirect when 401 and not special URL (session check and login)', () => {
    const serviceSpy = subscribeSpyTo(spectator.service.intercept(new HttpRequest('POST', '/ok', {}),  mockError(401)), { expectErrors: true});
    expect(serviceSpy.getValues()).toEqual([]);
    expect(serviceSpy.receivedError()).toBeFalsy();
    expect(spectator.inject(SessionService).signedOut).toBeCalledWith(true);
  })

  it('shoud sign out but NOT redirect when 401 and special URL : session check or login, error should be transmitted to caller', () => {
    const serviceSpy = subscribeSpyTo(spectator.service.intercept(new HttpRequest('POST', '/auth/session', {}),  mockError(401)), { expectErrors: true});
    expect(serviceSpy.getValues()).toEqual([]);
    expect(serviceSpy.receivedError()).toBeTruthy();
    expect(spectator.inject(SessionService).signedOut).toBeCalledWith(false);
  })

  it('shoud NOT sign out when error not a 401', () => {
    const serviceSpy = subscribeSpyTo(spectator.service.intercept(new HttpRequest('POST', '/dontcare', {}),  mockError(403)), { expectErrors: true});
    expect(serviceSpy.getValues()).toEqual([]);
    expect(serviceSpy.receivedError()).toBeTruthy();
    expect(spectator.inject(SessionService).signedOut).not.toBeCalled();
  })

  it('shoud NOT sign out when no error', () => {
    const serviceSpy = subscribeSpyTo(spectator.service.intercept(new HttpRequest('POST', '/dontcare', {}),  mockOk()));
    expect(serviceSpy.getValues().length).toEqual(1)
    expect(serviceSpy.receivedError()).toBeFalsy();
    expect(spectator.inject(SessionService).signedOut).not.toBeCalled();
  })
});
