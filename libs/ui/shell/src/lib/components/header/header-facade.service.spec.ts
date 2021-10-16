import { HeaderFacadeService } from './header-facade.service';
import { ApiService } from '@cheesecake-ui/core/api';
import { SessionService } from '@cheesecake-ui/core-auth';
import { of } from 'rxjs';
import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator/jest';
import { Router } from '@angular/router';

describe('HeaderFacadeService', () => {
  let spectator: SpectatorService<HeaderFacadeService>;
  const createService = createServiceFactory({
    service: HeaderFacadeService,
    providers: [
      mockProvider(ApiService, {
        sendCommand: () => of({})
      }),
      mockProvider(SessionService),
      mockProvider(Router)
    ]
  });

  beforeEach(() => spectator = createService());

  it('should send command and call signout when calling logout', () => {
    spectator.service.logout();

    expect(spectator.inject(SessionService).signedOut).toHaveBeenCalledTimes(1);
    expect(spectator.inject(Router).navigate).toHaveBeenCalledTimes(1);

  });
});
