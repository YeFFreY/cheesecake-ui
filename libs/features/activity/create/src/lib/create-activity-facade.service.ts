import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateActivityFormService } from './create-activity-form.service';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { ApiService, handleInvalidRequest, InvalidRequestErrorItem, ResourceId } from '@cheesecake-ui/core/api';
import { catchError, filter, map, sample, switchMap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CreateActivityCommand } from './create-activity.domain';

@UntilDestroy()
@Injectable()
export class CreateActivityFacadeService {
  private submitSubject = new Subject<void>();
  private submittedSubject = new Subject<ResourceId>();
  private errorsSubject = new BehaviorSubject<{ summary: string, errors: InvalidRequestErrorItem[] } | null>(null);

  private submit$ = this.submitSubject.asObservable();
  private errors$ = this.errorsSubject.asObservable();

  public readonly submitted$ = this.submittedSubject.asObservable();
  public vm$ = combineLatest([this.errors$]).pipe(
    map(([error]) => ({ error }))
  );

  private formService: CreateActivityFormService;

  constructor(private api: ApiService, private readonly fb: FormBuilder) {
    this.formService = new CreateActivityFormService(fb);

    this.formService.values$.pipe(
      sample(this.submit$),
      filter(() => this.formService.validForm),
      switchMap(activity => this.create(activity)),
      untilDestroyed(this)
    ).subscribe((result) => {
      this.submittedSubject.next(result.data)
    });
  }

  get form(): FormGroup {
    return this.formService.form;
  }

  public submit() {
    this.submitSubject.next();
  }

  private create(activity: CreateActivityCommand) {
    return this.api.sendCommand<ResourceId>('api/activities', activity)
      .pipe(
        catchError(handleInvalidRequest((errorData) => {
          this.errorsSubject.next({ summary: errorData.type, errors: errorData.errors });
        }))
      );
  }
}
