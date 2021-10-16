import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

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

  public signedIn() {
    this.state.next({ authenticated: true });
  }

  public signedOut() {
    this.state.next({ authenticated: false });
  }

}
