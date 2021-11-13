import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { ApiService, Resource, ResourceId } from '@cheesecake-ui/core/api';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export interface Equipment extends Resource {
  name: string;
  description: string;
}

@UntilDestroy()
@Injectable()
export class CreateActivityMaterialsFacadeService {
  private equipmentStore = new BehaviorSubject<Equipment[]>([]);
  private criteriaStore = new Subject<ResourceId>();
  private selectionStore = new Subject<ResourceId>();
  private submittedSubject: Subject<ResourceId> = new Subject<ResourceId>();

  private equipment$ = this.equipmentStore.pipe(distinctUntilChanged());
  private criteria$ = this.criteriaStore.pipe(distinctUntilChanged());
  private selection$ = this.selectionStore.pipe(distinctUntilChanged());

  public readonly submitted$ = this.submittedSubject.asObservable();

  public vm$ = combineLatest([this.equipment$]).pipe(
    map(([equipments]) => ({ equipments }))
  );

  constructor(private api: ApiService) {
    this.criteria$.pipe(
      switchMap(activityId => this.fetchAvailableEquipments(activityId)),
      untilDestroyed(this)
    ).subscribe(result => this.equipmentStore.next(result.data));

    combineLatest([this.criteria$, this.selection$]).pipe(
      switchMap(([activityId, equipmentId]) => this.createActivityMaterials(activityId, equipmentId)),
      untilDestroyed(this)
    ).subscribe((response) => {
      this.submittedSubject.next(response.data);
    });
  }

  public selectEquipment(equipmentId: ResourceId) {
    this.selectionStore.next(equipmentId);
  }

  private fetchAvailableEquipments(activityId: ResourceId) {
    return this.api.sendQuery<Equipment[]>(`api/activity-materials/available/${activityId}`);
  }

  private createActivityMaterials(activityId: ResourceId, equipmentId: ResourceId) {
    return this.api.sendCommand<ResourceId>('api/activity-materials', { activityId, equipmentId });
  }

  public updateCriteria(activityId: ResourceId) {
    this.criteriaStore.next(activityId);
  }
}
