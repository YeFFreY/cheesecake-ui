import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { ApiService, handleInvalidRequest, InvalidRequestErrorItem, ResourceId } from '@cheesecake-ui/core/api';
import { catchError, filter, map, sample, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateClassFormService } from './create-class-form.service';

export interface CreateClassCommand {
  name: string;
  description: string;
}


@UntilDestroy()
@Injectable()
export class CreateClassFacadeService {
  private submitSubject = new Subject<void>();
  private submittedSubject = new Subject<ResourceId>();
  private errorsSubject = new BehaviorSubject<{ summary: string, errors: InvalidRequestErrorItem[] } | null>(null);

  private submit$ = this.submitSubject.asObservable();
  private errors$ = this.errorsSubject.asObservable();

  public readonly submitted$ = this.submittedSubject.asObservable();
  public vm$ = combineLatest([this.errors$]).pipe(
    map(([error]) => ({ error }))
  );

  private formService: CreateClassFormService;

  constructor(private api: ApiService, private readonly fb: FormBuilder) {
    this.formService = new CreateClassFormService(fb);

    this.formService.values$.pipe(
      sample(this.submit$),
      filter(() => this.formService.validForm),
      switchMap(command => this.create(command)),
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

  private create(command: CreateClassCommand) {
    return this.api.sendCommand<ResourceId>('api/classes', command)
      .pipe(
        catchError(handleInvalidRequest((errorData) => {
          this.errorsSubject.next({ summary: errorData.type, errors: errorData.errors });
        }))
      );
  }
}
