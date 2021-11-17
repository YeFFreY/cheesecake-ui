import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, Observable, Subject } from 'rxjs';
import { ApiService, Resource, ResourceId } from '@cheesecake-ui/core/api';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

export interface ActivityVariant extends Resource{
  name: string;
  description: string;
}

@UntilDestroy()
@Injectable()
export class ListActivityVariantFacadeService {
  private variantsStore = new Subject<ActivityVariant[]>();
  private criteriaStore = new Subject<ResourceId>();

  private variants$ = this.variantsStore.asObservable().pipe(distinctUntilChanged());
  private criteria$ = this.criteriaStore.asObservable();

  public vm$: Observable<{ variants: ActivityVariant[] }> = combineLatest([this.variants$]).pipe(
    map(([variants]) => ({ variants }))
  );

  constructor(private api: ApiService) {
    this.criteria$.pipe(
      switchMap(activityId => this.fetchVariants(activityId)),
      untilDestroyed(this)
    ).subscribe(result => this.variantsStore.next(result.data));
  }

  private fetchVariants(activityId: ResourceId) {
    return this.api.sendQuery<ActivityVariant[]>(`api/activity-variants/${activityId}`);
  }

  public updateCriteria(activityId: ResourceId) {
    this.criteriaStore.next(activityId);
  }
}
