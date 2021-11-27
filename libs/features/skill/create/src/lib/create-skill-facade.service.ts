import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { ApiService, handleInvalidRequest, RequestError, ResourceId } from '@cheesecake-ui/core/api';
import { catchError, filter, map, sample, switchMap } from 'rxjs/operators';
import { CreateSkillFormService } from './create-skill-form.service';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface CreateSkillCommand {
  name: string;
  description: string;
}

@UntilDestroy()
@Injectable()
export class CreateSkillFacadeService {
  private submitSubject = new Subject<void>();
  private submittedSubject = new Subject<ResourceId>();
  private errorsSubject = new BehaviorSubject<RequestError | null>(null);

  private submit$ = this.submitSubject.asObservable();
  private errors$ = this.errorsSubject.asObservable();

  public readonly submitted$ = this.submittedSubject.asObservable();
  public vm$ = combineLatest([this.errors$]).pipe(
    map(([error]) => ({ error }))
  );

  private formService: CreateSkillFormService;

  constructor(private api: ApiService, private readonly fb: FormBuilder) {
    this.formService = new CreateSkillFormService(fb);

    this.formService.values$.pipe(
      sample(this.submit$),
      filter(() => this.formService.validForm),
      switchMap(skill => this.create(skill)),
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

  private create(skill: CreateSkillCommand) {
    return this.api.sendCommand<ResourceId>('api/skills', skill)
      .pipe(
        catchError(handleInvalidRequest((errorData) => {
          this.errorsSubject.next({ summary: errorData.type, errors: errorData.errors });
        }))
      );
  }
}
