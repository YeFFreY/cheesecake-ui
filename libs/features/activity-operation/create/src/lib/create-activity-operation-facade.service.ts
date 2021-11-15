import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { ApiService, handleInvalidRequest, InvalidRequestErrorItem, ResourceId } from '@cheesecake-ui/core/api';
import { catchError, distinctUntilChanged, filter, map, sample, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CreateActivityOperationFormService } from './create-activity-operation-form.service';

export interface CreateActivityOperationCommand {
  activityId: ResourceId,
  type: string;
  description: string;
}

@UntilDestroy()
@Injectable()
export class CreateActivityOperationFacadeService {
  private criteriaStore = new Subject<ResourceId>();
  private submitSubject = new Subject<void>();
  private submittedSubject = new Subject<ResourceId>();
  private errorsSubject = new BehaviorSubject<{ summary: string, errors: InvalidRequestErrorItem[] } | null>(null);

  private criteria$ = this.criteriaStore.asObservable().pipe(distinctUntilChanged());
  private submit$ = this.submitSubject.asObservable();
  private errors$ = this.errorsSubject.asObservable();

  public readonly submitted$ = this.submittedSubject.asObservable();
  public vm$ = combineLatest([this.errors$]).pipe(
    map(([error]) => ({ error }))
  );

  private formService: CreateActivityOperationFormService;

  constructor(private api: ApiService, private readonly fb: FormBuilder) {
    this.formService = new CreateActivityOperationFormService(fb);

    combineLatest([this.formService.values$, this.criteria$]).pipe(
      sample(this.submit$),
      filter(() => this.formService.validForm),
      switchMap(([operation, activityId])=> this.create({...operation, activityId})),
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

  public updateCriteria(activityId: ResourceId) {
    this.criteriaStore.next(activityId);
  }

  private create(operation: CreateActivityOperationCommand) {
    return this.api.sendCommand<ResourceId>('api/activity-operations', operation)
      .pipe(
        catchError(handleInvalidRequest((errorData) => {
          this.errorsSubject.next({ summary: errorData.type, errors: errorData.errors });
        }))
      );
  }

}
