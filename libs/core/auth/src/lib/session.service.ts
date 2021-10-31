import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface Session {
  authenticated: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private state = new BehaviorSubject<Session>({ authenticated: false });
  private state$ = this.state.asObservable();
  public authenticated$ = this.state$.pipe(map(state => state.authenticated), distinctUntilChanged());

  constructor(private router: Router) {
  }

  public signedIn() {
    this.state.next({ authenticated: true });
  }

  public signedOut(redirectToLogin: boolean = false) {
    this.state.next({ authenticated: false });
    if(redirectToLogin) {
      console.log('Redirecting to login!')
      this.router.navigate(['/login']);
    }
  }

}
