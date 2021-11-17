import { Injectable } from '@angular/core';
import { ApiService, ResourceId } from '@cheesecake-ui/core/api';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

export interface ActivityOperation {
  typeId: string; // todo typeId could become the Id and so ActivityOperation could extends Resource (even if the type id is not really an id ?)
  typeDescription: string;
  description: string;
}

@UntilDestroy()
@Injectable()
export class ListActivityOperationFacadeService {
  private operationsStore = new Subject<ActivityOperation[]>();
  private criteriaStore = new Subject<ResourceId>();

  private operations$ = this.operationsStore.asObservable().pipe(distinctUntilChanged());
  private criteria$ = this.criteriaStore.asObservable();

  public vm$: Observable<{ operations: ActivityOperation[] }> = combineLatest([this.operations$]).pipe(
    map(([operations]) => ({ operations }))
  );

  constructor(private api: ApiService) {
    this.criteria$.pipe(
      switchMap(activityId => this.fetchOperations(activityId)),
      untilDestroyed(this)
    ).subscribe(result => this.operationsStore.next(result.data));
  }

  private fetchOperations(activityId: ResourceId) {
    return this.api.sendQuery<ActivityOperation[]>(`api/activity-operations/${activityId}`);
  }

  public updateCriteria(activityId: ResourceId) {
    this.criteriaStore.next(activityId);
  }
}
