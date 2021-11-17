import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ApiService, handleInvalidRequest, InvalidRequestErrorItem, ResourceId } from '@cheesecake-ui/core/api';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, filter, map, sample, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateActivityVariantFormService } from './create-activity-variant-form.service';

export interface CreateActivityVariantCommand {
  activityId: ResourceId,
  name: string;
  description: string;
}

@UntilDestroy()
@Injectable()
export class CreateActivityVariantFacadeService {

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

  private formService: CreateActivityVariantFormService;

  constructor(private api: ApiService, private readonly fb: FormBuilder) {
    this.formService = new CreateActivityVariantFormService(fb);

    combineLatest([this.formService.values$, this.criteria$]).pipe(
      sample(this.submit$),
      filter(() => this.formService.validForm),
      switchMap(([variant, activityId]) => this.create({ ...variant, activityId })),
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

  private create(command: CreateActivityVariantCommand) {
    return this.api.sendCommand<ResourceId>('api/activity-variants', command)
      .pipe(
        catchError(handleInvalidRequest((errorData) => {
          this.errorsSubject.next({ summary: errorData.type, errors: errorData.errors });
        }))
      );
  }
}
