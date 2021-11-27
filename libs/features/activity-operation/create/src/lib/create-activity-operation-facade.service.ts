import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { ApiService, handleInvalidRequest, RequestError, Resource, ResourceId } from '@cheesecake-ui/core/api';
import { catchError, distinctUntilChanged, filter, map, sample, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CreateActivityOperationFormService } from './create-activity-operation-form.service';


export interface CreateActivityOperationCommand {
  activityId: ResourceId,
  type: string;
  description: string;
}

export interface OperationType extends Resource {
  description: string;
}

@UntilDestroy()
@Injectable()
export class CreateActivityOperationFacadeService {
  private criteriaStore = new Subject<ResourceId>();
  private operationTypesStore = new BehaviorSubject<OperationType[]>([]);
  private submitSubject = new Subject<void>();
  private submittedSubject = new Subject<ResourceId>();
  private errorsSubject = new BehaviorSubject<RequestError | null>(null);

  private criteria$ = this.criteriaStore.asObservable().pipe(distinctUntilChanged());
  private operationTypes$ = this.operationTypesStore.asObservable().pipe(distinctUntilChanged());
  private submit$ = this.submitSubject.asObservable();
  private errors$ = this.errorsSubject.asObservable();

  public readonly submitted$ = this.submittedSubject.asObservable();
  public vm$ = combineLatest([this.errors$, this.operationTypes$]).pipe(
    map(([error, operationTypes]) => ({ error, operationTypes }))
  );

  private formService: CreateActivityOperationFormService;

  constructor(private api: ApiService, private readonly fb: FormBuilder) {
    this.formService = new CreateActivityOperationFormService(fb);

    this.criteria$.pipe(
      switchMap((activityId) => this.fetchAvailableOperationTypes(activityId)),
      untilDestroyed(this)
    ).subscribe(result => this.operationTypesStore.next(result.data));

    combineLatest([this.formService.values$, this.criteria$]).pipe(
      sample(this.submit$),
      filter(() => this.formService.validForm),
      switchMap(([operation, activityId]) => this.create({ ...operation, activityId })),
      untilDestroyed(this)
    ).subscribe((result) => {
      this.submittedSubject.next(result.data);
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

  private fetchAvailableOperationTypes(activityId: ResourceId) {
    return this.api.sendQuery<OperationType[]>(`/api/activity-operations/available/${activityId}`);
  }
}
