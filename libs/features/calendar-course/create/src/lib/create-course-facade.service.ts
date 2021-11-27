import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ApiService, handleInvalidRequest, RequestError, Resource, ResourceId } from '@cheesecake-ui/core/api';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, filter, map, sample, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateCourseFormService } from './create-course-form.service';

export interface CreateCourseCommand {
  calendarId: ResourceId;
  classId: ResourceId;
  start: string;
  end: string;
}

export interface Classs extends Resource {
  name: string;
  description: string;
}

@UntilDestroy()
@Injectable()
export class CreateCourseFacadeService {
  private criteriaStore = new Subject<ResourceId>();
  private classesStore = new BehaviorSubject<Classs[]>([]);
  private submitSubject = new Subject<void>();
  private submittedSubject = new Subject<ResourceId>();
  private errorsSubject = new BehaviorSubject<RequestError | null>(null);

  private criteria$ = this.criteriaStore.asObservable().pipe(distinctUntilChanged());
  private classes$ = this.classesStore.asObservable().pipe(distinctUntilChanged());
  private submit$ = this.submitSubject.asObservable();
  private errors$ = this.errorsSubject.asObservable();

  public readonly submitted$ = this.submittedSubject.asObservable();
  public vm$ = combineLatest([this.errors$, this.classes$]).pipe(
    map(([error, classes]) => ({ error, classes }))
  );

  private formService: CreateCourseFormService;

  constructor(private api: ApiService, private readonly fb: FormBuilder) {
    this.formService = new CreateCourseFormService(fb);

    this.criteria$.pipe(
      switchMap(() => this.fetchClasses()),
      untilDestroyed(this)
    ).subscribe(result => this.classesStore.next(result.data));

    combineLatest([this.formService.values$, this.criteria$]).pipe(
      sample(this.submit$),
      filter(() => this.formService.validForm),
      switchMap(([command, calendarId]) => this.create({ ...command, calendarId })),
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

  public updateCriteria(calendarId: ResourceId) {
    this.criteriaStore.next(calendarId);
  }

  private create(command: CreateCourseCommand) {
    return this.api.sendCommand<ResourceId>('api/courses', command)
      .pipe(
        catchError(handleInvalidRequest((errorData) => {
          this.errorsSubject.next({ summary: errorData.type, errors: errorData.errors });
        }))
      );
  }

  private fetchClasses() {
    return this.api.sendQuery<Classs[]>(`/api/classes`);
  }
}
