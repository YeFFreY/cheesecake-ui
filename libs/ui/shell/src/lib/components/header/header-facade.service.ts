import { Injectable } from '@angular/core';
import { ApiService } from '@cheesecake-ui/core/api';
import { AuthStateService } from '@cheesecake-ui/core-auth';

@Injectable()
export class HeaderFacadeService {
  constructor(private api: ApiService, private authState: AuthStateService) {
  }

  get authenticated$() {
    return this.authState.authenticated$
  }

  logout() {
    this.api.sendCommand<void>('auth/logout', {})
      .subscribe(() => this.authState.signedOut());
  }
}
