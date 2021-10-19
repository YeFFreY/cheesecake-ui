import { APP_INITIALIZER, Provider } from '@angular/core';
import { ApiService, handleAuthenticationError } from '@cheesecake-ui/core/api';
import { SessionService } from './session.service';
import { catchError } from 'rxjs/operators';

export function initializeSession(api: ApiService, sessionService: SessionService) {
  return () => {
    return new Promise<void>((resolve) => {
      api.sendQuery('/auth/session').pipe(
        catchError(handleAuthenticationError(() => {
          sessionService.signedOut();
          resolve()
        }))
      ).subscribe(() => {
        sessionService.signedIn();
        resolve();
      });
    });
  };
}

export const sessionInitialize: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeSession,
  multi: true,
  deps: [ApiService, SessionService]
};
