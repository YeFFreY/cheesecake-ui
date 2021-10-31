import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateActivityFormService } from './create-activity-form.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { ApiService, handleInvalidRequest, InvalidRequestErrorItem, Resource } from '@cheesecake-ui/core/api';
import { catchError, map, sample, switchMap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { CreateActivityCommand } from './create-activity.domain';

@UntilDestroy()
@Injectable()
export class CreateActivityFacadeService {
  private submitSubject = new BehaviorSubject<boolean>(false);
  private errorsSubject = new BehaviorSubject<{ summary: string, errors: InvalidRequestErrorItem[] } | null>(null);

  private submit$: Observable<boolean> = this.submitSubject.asObservable();
  private errors$ = this.errorsSubject.asObservable();

  public vm$ = combineLatest([this.errors$]).pipe(
    map(([error]) => ({ error }))
  );
  private formService: CreateActivityFormService;

  constructor(private api: ApiService, private readonly fb: FormBuilder, private router: Router) {
    this.formService = new CreateActivityFormService(fb);

    this.formService.validValue$.pipe(
      sample(this.submit$),
      switchMap(activity => this.create(activity)),
      untilDestroyed(this)
    ).subscribe(() => {
      this.router.navigate(['/app']);
    });
  }

  get form(): FormGroup {
    return this.formService.form;
  }

  public submit() {
    this.submitSubject.next(true);
  }

  private create(activity: CreateActivityCommand) {
    return this.api.sendCommand<Resource>('api/activities', activity)
      .pipe(
        catchError(handleInvalidRequest((errorData) => {
          this.errorsSubject.next({ summary: errorData.type, errors: errorData.errors });
        }))
      );
  }
}
