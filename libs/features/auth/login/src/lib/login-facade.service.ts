import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, sample, switchMap } from 'rxjs/operators';
import { AuthStateService } from '@cheesecake-ui/core-auth';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginFacadeService {

  private credentialsSubject = new Subject<Credentials>();
  private submitSubject = new BehaviorSubject<boolean>(false);

  private credentials$ = this.credentialsSubject.asObservable();
  private submit$: Observable<boolean> = this.submitSubject.asObservable();
  private authenticated$ = this.authState.authenticated$;

  public vm$ = this.authenticated$.pipe(
    map(authenticated => ({ authenticated }))
  );

  constructor(private http: HttpClient, private authState: AuthStateService) {
    this.credentials$.pipe(
      sample(this.submit$),
      switchMap(credentials => this.http.post('https://reqres.in/api/login', credentials))
    ).subscribe(() => this.authState.signedIn());
  }

  public submit() {
    this.submitSubject.next(true);
  }

  public updateCredentials(credentials: Credentials) {
    this.credentialsSubject.next(credentials);
  }
}
