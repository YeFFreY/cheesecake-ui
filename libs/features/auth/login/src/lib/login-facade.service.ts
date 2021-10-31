import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { catchError, map, sample, switchMap } from 'rxjs/operators';
import { SessionService } from '@cheesecake-ui/core-auth';
import {
  ApiService,
  handleAuthenticationError,
  handleInvalidRequest,
  InvalidRequestErrorItem,
  Resource
} from '@cheesecake-ui/core/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginFormService } from './login-form.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Credentials } from './login.domain';
import { ActivatedRoute, Router } from '@angular/router';


@UntilDestroy()
@Injectable()
export class LoginFacadeService {

  private submitSubject = new BehaviorSubject<boolean>(false);
  private errorsSubject = new BehaviorSubject<{ summary: string, errors: InvalidRequestErrorItem[] } | null>(null);

  private submit$: Observable<boolean> = this.submitSubject.asObservable();
  private errors$ = this.errorsSubject.asObservable();

  public vm$ = combineLatest([this.errors$]).pipe(
    map(([error]) => ({ error }))
  );

  private formService: LoginFormService;

  constructor(private api: ApiService, private sessionService: SessionService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.formService = new LoginFormService(fb);

    this.formService.validValue$.pipe(
      sample(this.submit$),
      switchMap(credentials => this.login(credentials)),
      untilDestroyed(this)
    ).subscribe(() => {
      this.sessionService.signedIn();
      this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/app']);
    });
  }

  public submit() {
    this.submitSubject.next(true);
  }

  get form(): FormGroup {
    return this.formService.form;
  }

  private login(credentials: Credentials) {
    return this.api.sendCommand<Resource>('auth/login', credentials)
      .pipe(
        catchError(handleInvalidRequest((errorData) => {
          this.errorsSubject.next({ summary: errorData.type, errors: errorData.errors });
        })),
        catchError(handleAuthenticationError((errorData) => {
          this.errorsSubject.next({ summary: errorData.type, errors: [] });
        }))
      );
  }
}
