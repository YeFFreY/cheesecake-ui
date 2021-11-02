import { APP_INITIALIZER, Provider } from '@angular/core';
import { ApiService } from '@cheesecake-ui/core/api';
import { SessionService } from './session.service';

export function initializeSession(api: ApiService, sessionService: SessionService) {
  return () => {
    return new Promise<void>((resolve) => {
      api.sendQuery('/auth/session')
        .subscribe(() => {
          sessionService.signedIn();
          resolve();
        }, () => resolve(),
          () => resolve());
    });
  };
}

export const sessionInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeSession,
  multi: true,
  deps: [ApiService, SessionService]
};
