import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject } from 'rxjs';
import { ApiService, ResourceId } from '@cheesecake-ui/core/api';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

@UntilDestroy()
@Injectable()
export class DeleteActivityMaterialsFacadeService {

  private criteriaStore = new Subject<{ activityId: ResourceId, equipmentId: ResourceId }>();
  private submittedSubject: Subject<ResourceId> = new Subject<ResourceId>();

  private criteria$ = this.criteriaStore.pipe(distinctUntilChanged());

  public readonly submitted$ = this.submittedSubject.asObservable();

  constructor(private api: ApiService) {
    this.criteria$.pipe(
      switchMap(({ activityId, equipmentId }) => this.delete(activityId, equipmentId)),
      untilDestroyed(this)
    ).subscribe(result => this.submittedSubject.next(result.data));
  }

  private delete(activityId: ResourceId, equipmentId: ResourceId) {
    return this.api.sendCommand<ResourceId>('api/activity-materials/delete', { activityId, equipmentId });
  }


  public updateCriteria(activityId: ResourceId, equipmentId: ResourceId) {
    this.criteriaStore.next({ activityId, equipmentId });
  }
}
