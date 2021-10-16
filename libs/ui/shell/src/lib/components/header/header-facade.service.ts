import { Injectable } from '@angular/core';
import { ApiService } from '@cheesecake-ui/core/api';
import { SessionService } from '@cheesecake-ui/core-auth';
import { Router } from '@angular/router';

@Injectable()
export class HeaderFacadeService {
  constructor(private api: ApiService, private sessionService: SessionService, private router: Router) {
  }

  get authenticated$() {
    return this.sessionService.authenticated$
  }

  logout() {
    this.api.sendCommand<void>('auth/logout', {})
      .subscribe(() => {
        this.sessionService.signedOut();
        this.router.navigate(['/'])
      });
  }
}
