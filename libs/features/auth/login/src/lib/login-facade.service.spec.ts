import { subscribeSpyTo } from '@hirez_io/observer-spy';

import { LoginFacadeService } from './login-facade.service';
import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator/jest';
import { ApiService, AuthenticationError } from '@cheesecake-ui/core/api';
import { SessionService } from '@cheesecake-ui/core-auth';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


describe('LoginFacadeService', () => {
  let spectator: SpectatorService<LoginFacadeService>;
  const createService = createServiceFactory({
    service: LoginFacadeService,
    imports: [ReactiveFormsModule],
    mocks: [ApiService, SessionService],
    providers: [
      mockProvider(Router),
      mockProvider(ActivatedRoute, {
        snapshot: { queryParams: { redirect: '/bob' } }
      })
    ]
  });

  beforeEach(() => spectator = createService());

  it('should mark as authenticated when credentials received and submitted', () => {
    const vmSpy = subscribeSpyTo(spectator.service.vm$);
    spectator.inject(ApiService).sendCommand.andReturn(of({}));

    spectator.service.form.patchValue({ username: 'a.b@c.d', password: 'password' });
    spectator.service.submit();

    expect(vmSpy.getValues()).toEqual([{ error: null }]);
    expect(spectator.inject(SessionService).signedIn).toHaveBeenCalledTimes(1);
    expect(spectator.inject(Router).navigate).toHaveBeenCalledTimes(1);
    expect(spectator.inject(Router).navigate).toHaveBeenCalledWith(['/bob']);
  });

  it('should not mark as authenticated when invalid request returned', () => {
    const vmSpy = subscribeSpyTo(spectator.service.vm$);
    spectator.inject(ApiService).sendCommand.andCallFake(() => throwError({ type: 'AuthenticationError' } as AuthenticationError));

    spectator.service.form.patchValue({ username: 'a.b@c.d', password: 'password' });
    spectator.service.submit();


    expect(vmSpy.getValues()).toEqual([{ error: null }, {
      error: { summary: 'AuthenticationError', errors: [] }
    }]);
    expect(spectator.inject(SessionService).signedIn).not.toBeCalled();
    expect(spectator.inject(Router).navigate).not.toBeCalled();
  });
});
