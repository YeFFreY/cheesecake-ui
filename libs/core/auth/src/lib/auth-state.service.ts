import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface Authentication {
  authenticated: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private state = new BehaviorSubject<Authentication>({ authenticated: false });
  private state$ = this.state.asObservable();
  public authenticated$ = this.state$.pipe(map(state => state.authenticated), distinctUntilChanged());

  constructor(private router: Router) {
    this.authenticated$.subscribe(authenticated => {
      authenticated ? this.router.navigate(['/app']) : router.navigate(['/'])
    })
  }

  public signedIn() {
    this.state.next({ authenticated: true });
  }

  public signedOut() {
    this.state.next({ authenticated: false });
  }
}
