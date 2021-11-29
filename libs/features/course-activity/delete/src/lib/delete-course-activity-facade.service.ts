import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject } from 'rxjs';
import { ApiService, ResourceId } from '@cheesecake-ui/core/api';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

@UntilDestroy()
@Injectable()
export class DeleteCourseActivityFacadeService {

  private criteriaStore = new Subject<{ courseId: ResourceId, activityId: ResourceId, courseSectionTypeId: ResourceId }>();
  private submittedSubject: Subject<ResourceId> = new Subject<ResourceId>();

  private criteria$ = this.criteriaStore.pipe(distinctUntilChanged());

  public readonly submitted$ = this.submittedSubject.asObservable();

  constructor(private api: ApiService) {
    this.criteria$.pipe(
      switchMap(({
                   courseId,
                   activityId,
                   courseSectionTypeId
                 }) => this.delete(courseId, activityId, courseSectionTypeId)),
      untilDestroyed(this)
    ).subscribe(result => this.submittedSubject.next(result.data));
  }

  private delete(courseId: ResourceId, activityId: ResourceId, courseSectionTypeId: ResourceId) {
    return this.api.sendCommand<ResourceId>('api/course-activities/delete', {
      courseId,
      activityId,
      courseSectionTypeId
    });
  }

  public updateCriteria(courseId: ResourceId, activityId: ResourceId, courseSectionTypeId: ResourceId) {
    this.criteriaStore.next({ courseId, activityId, courseSectionTypeId });
  }
}
