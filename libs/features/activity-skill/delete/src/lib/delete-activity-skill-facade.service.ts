import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService, ResourceId } from '@cheesecake-ui/core/api';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable()
export class DeleteActivitySkillFacadeService {

  private criteriaStore = new Subject<{ activityId: ResourceId, skillId: ResourceId }>();
  private submittedSubject: Subject<ResourceId> = new Subject<ResourceId>();

  private criteria$ = this.criteriaStore.pipe(distinctUntilChanged());

  public readonly submitted$ = this.submittedSubject.asObservable();

  constructor(private api: ApiService) {
    this.criteria$.pipe(
      switchMap(({ activityId, skillId }) => this.delete(activityId, skillId)),
      untilDestroyed(this)
    ).subscribe(result => this.submittedSubject.next(result.data));
  }

  private delete(activityId: ResourceId, skillId: ResourceId) {
    return this.api.sendCommand<ResourceId>('api/activity-skills/delete', { activityId, skillId });
  }


  public updateCriteria(activityId: ResourceId, skillId: ResourceId) {
    this.criteriaStore.next({ activityId, skillId });
  }
}
