import { subscribeSpyTo } from '@hirez_io/observer-spy';

import { LoginFacadeService } from './login-facade.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { ApiService, AuthenticationError } from '@cheesecake-ui/core/api';
import { AuthStateService } from '@cheesecake-ui/core-auth';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';


describe('LoginFacadeService', () => {
  let spectator: SpectatorService<LoginFacadeService>;
  const createService = createServiceFactory({
    service: LoginFacadeService,
    imports: [ReactiveFormsModule],
    mocks: [ApiService, AuthStateService]
  });

  beforeEach(() => spectator = createService());

  it('should mark as authenticated when credentials received and submitted', () => {
    const vmSpy = subscribeSpyTo(spectator.service.vm$);
    spectator.inject(ApiService).sendCommand.andReturn(of({}));

    spectator.service.form.patchValue({ username: 'a.b@c.d', password: 'password' });
    spectator.service.submit();

    expect(vmSpy.getValues()).toEqual([{ error: null }]);
    expect(spectator.inject(AuthStateService).signedIn).toHaveBeenCalledTimes(1);
  });

  it('should not mark as authenticated when invalid request returned', () => {
    const vmSpy = subscribeSpyTo(spectator.service.vm$);
    spectator.inject(ApiService).sendCommand.andCallFake(() => throwError({ type: 'AuthenticationError' } as AuthenticationError));

    spectator.service.form.patchValue({ username: 'a.b@c.d', password: 'password' });
    spectator.service.submit();


    expect(vmSpy.getValues()).toEqual([{ error: null }, {
      error: { summary: 'AuthenticationError', errors: [] }
    }]);
    expect(spectator.inject(AuthStateService).signedIn).toHaveBeenCalledTimes(0);
  });
});
