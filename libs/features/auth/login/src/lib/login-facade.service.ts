import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { catchError, map, sample, switchMap } from 'rxjs/operators';
import { AuthStateService } from '@cheesecake-ui/core-auth';
import { ApiService, handleInvalidRequest, Resource } from '@cheesecake-ui/core/api';


export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginFacadeService {

  private credentialsSubject = new Subject<Credentials>();
  private errorsSubject = new BehaviorSubject<string | null>(null);
  private submitSubject = new BehaviorSubject<boolean>(false);

  private credentials$ = this.credentialsSubject.asObservable();
  private errors$ = this.errorsSubject.asObservable();
  private submit$: Observable<boolean> = this.submitSubject.asObservable();
  private authenticated$ = this.authState.authenticated$;

  public vm$ = combineLatest(this.authenticated$, this.errors$).pipe(
    map(([authenticated, errors]) => ({ authenticated, errors }))
  );

  constructor(private api: ApiService, private authState: AuthStateService) {
    this.credentials$.pipe(
      sample(this.submit$),
      switchMap(credentials => this.login(credentials))
    ).subscribe(() => {
      this.authState.signedIn();
    });
  }

  public submit() {
    this.submitSubject.next(true);
  }

  public updateCredentials(credentials: Credentials) {
    this.credentialsSubject.next(credentials);
  }

  private login(credentials: Credentials) {
    return this.api.sendCommand<Resource>('https://reqres.in/api/login', credentials)
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        catchError(handleInvalidRequest((_errorData) => {
          this.errorsSubject.next('invalid request')
        }))
      );
  }
}
