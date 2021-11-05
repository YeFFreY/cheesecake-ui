import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { ApiService, Resource, ResourceId } from '@cheesecake-ui/core/api';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export interface ActivityDetails extends Resource {
  name: string;
  description: string;
}

@UntilDestroy()
@Injectable()
export class DetailsActivityFacadeService {

  private activityStore = new Subject<ActivityDetails>();
  private idStore = new Subject<ResourceId>();

  private activity$ = this.activityStore.pipe(distinctUntilChanged());
  private id$ = this.idStore.pipe(distinctUntilChanged());


  public vm$: Observable<{ activity: ActivityDetails }> = combineLatest([this.activity$]).pipe(
    map(([activity]) => ({ activity })),
    untilDestroyed(this)
  );

  constructor(private api: ApiService) {
    this.id$.pipe(
      switchMap((id) => this.fetchActivity(id)),
      untilDestroyed(this)
    ).subscribe(result => this.activityStore.next(result.data));
  }

  public updateActivityId(id: ResourceId) {
    this.idStore.next(id);
  }

  private fetchActivity(id: ResourceId) {
    return this.api.sendQuery<ActivityDetails>(`api/activities/${id}`);
  }
}
