import { Injectable } from '@angular/core';
import { ApiService, handleInvalidRequest, RequestError, Resource, ResourceId } from '@cheesecake-ui/core/api';
import { BehaviorSubject, combineLatest, forkJoin, Observable, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, filter, map, sample, switchMap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CreateCourseActivityFormService } from './create-course-activity-form.service';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface ActivityOverview extends Resource {
  name: string;
  description: string;
}

export interface CourseSectionType extends Resource {
  description: string;
}

export interface CreateCourseActivityCommand {
  courseId: ResourceId;
  activityId: ResourceId;
  courseSectionTypeId: ResourceId;
}

@UntilDestroy()
@Injectable()
export class CreateCourseActivityFacadeService {
  private activitiesStore = new Subject<ActivityOverview[]>();
  private sectionTypesStore = new Subject<CourseSectionType[]>();
  private courseIdStore = new Subject<ResourceId>();
  private submitSubject = new Subject<void>();
  private submittedSubject = new Subject<ResourceId>();
  private errorsSubject = new BehaviorSubject<RequestError | null>(null);

  private submit$ = this.submitSubject.asObservable();
  private errors$ = this.errorsSubject.asObservable();
  private activities$ = this.activitiesStore.pipe(distinctUntilChanged());
  private sectionTypes$ = this.sectionTypesStore.pipe(distinctUntilChanged());
  private criteria$ = this.courseIdStore.pipe(distinctUntilChanged());

  public readonly submitted$ = this.submittedSubject.asObservable();

  public vm$: Observable<{ error: RequestError | null, activities: ActivityOverview[], sectionTypes: CourseSectionType[] }> = combineLatest([this.errors$, this.activities$, this.sectionTypes$]).pipe(
    map(([error, activities, sectionTypes]) => ({ error, activities, sectionTypes }))
  );

  private formService: CreateCourseActivityFormService;

  constructor(private api: ApiService, private readonly fb: FormBuilder) {
    this.formService = new CreateCourseActivityFormService(fb);

    this.criteria$.pipe(
      switchMap(() => forkJoin([this.fetchActivities(), this.fetchSectionTypes()])),
      untilDestroyed(this)
    ).subscribe(([activitiesResult, sectionTypesResult]) => {
      this.activitiesStore.next(activitiesResult.data);
      this.sectionTypesStore.next(sectionTypesResult.data);
    });

    combineLatest([this.formService.values$, this.criteria$]).pipe(
      sample(this.submit$),
      filter(() => this.formService.validForm),
      switchMap(([activity, courseId]) => this.create({ ...activity, courseId })),
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

  private fetchActivities() {
    return this.api.sendQuery<ActivityOverview[]>('/api/course-activities/activities');
  }

  private fetchSectionTypes() {
    return this.api.sendQuery<CourseSectionType[]>('/api/course-activities/types');
  }

  updateCriteria(courseId: ResourceId) {
    this.courseIdStore.next(courseId);
  }

  private create(command: CreateCourseActivityCommand) {
    return this.api.sendCommand<ResourceId>('api/course-activities', command)
      .pipe(
        catchError(handleInvalidRequest((errorData) => {
          this.errorsSubject.next({ summary: errorData.type, errors: errorData.errors });
        }))
      );
  }
}
