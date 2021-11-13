import { Injectable } from '@angular/core';
import { ApiService, Resource, ResourceId } from '@cheesecake-ui/core/api';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

export interface ActivityMaterials extends Resource {
  name: string;
}

@UntilDestroy()
@Injectable()
export class ListActivityMaterialsFacadeService {
  private materialsStore = new Subject<ActivityMaterials[]>();
  private criteriaStore = new Subject<ResourceId>();

  private materials$ = this.materialsStore.asObservable().pipe(distinctUntilChanged());
  private criteria$ = this.criteriaStore.asObservable();

  public vm$: Observable<{ materials: ActivityMaterials[] }> = combineLatest([this.materials$]).pipe(
    map(([materials]) => ({ materials }))
  );

  constructor(private api: ApiService) {
    this.criteria$.pipe(
      switchMap(activityId => this.fetchMaterials(activityId)),
      untilDestroyed(this)
    ).subscribe(result => this.materialsStore.next(result.data));
  }

  private fetchMaterials(activityId: ResourceId) {
    return this.api.sendQuery<ActivityMaterials[]>(`api/activity-materials/${activityId}`);
  }

  public updateCriteria(activityId: ResourceId) {
    this.criteriaStore.next(activityId);
  }
}
