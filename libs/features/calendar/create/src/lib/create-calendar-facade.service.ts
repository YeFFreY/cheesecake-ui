import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService, handleInvalidRequest, RequestError, ResourceId } from '@cheesecake-ui/core/api';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { catchError, filter, map, sample, switchMap } from 'rxjs/operators';
import { CreateCalendarFormService } from './create-calendar-form.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export interface CreateCalendarCommand {
  name: string;
  description: string;
}

@UntilDestroy()
@Injectable()
export class CreateCalendarFacadeService {
  private submitSubject = new Subject<void>();
  private submittedSubject = new Subject<ResourceId>();
  private errorsSubject = new BehaviorSubject<RequestError | null>(null);

  private submit$ = this.submitSubject.asObservable();
  private errors$ = this.errorsSubject.asObservable();

  public readonly submitted$ = this.submittedSubject.asObservable();
  public vm$ = combineLatest([this.errors$]).pipe(
    map(([error]) => ({ error }))
  );

  private formService: CreateCalendarFormService;

  constructor(private api: ApiService, private readonly fb: FormBuilder) {
    this.formService = new CreateCalendarFormService(fb);

    this.formService.values$.pipe(
      sample(this.submit$),
      filter(() => this.formService.validForm),
      switchMap(command => this.create(command)),
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

  private create(command: CreateCalendarCommand) {
    return this.api.sendCommand<ResourceId>('api/calendars', command)
      .pipe(
        catchError(handleInvalidRequest((errorData) => {
          this.errorsSubject.next({ summary: errorData.type, errors: errorData.errors });
        }))
      );
  }
}
