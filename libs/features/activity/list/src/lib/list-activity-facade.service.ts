import { Injectable } from '@angular/core';
import { ApiService, Resource } from '@cheesecake-ui/core/api';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export interface Activity extends Resource {
  name: string;
  description: string;
}

@UntilDestroy()
@Injectable()
export class ListActivityFacadeService {

  private activitiesStore = new BehaviorSubject<Activity[]>([]);
  private criteriaStore = new BehaviorSubject<string>('');

  private activities$ = this.activitiesStore.pipe(distinctUntilChanged());
  private criteria$ = this.criteriaStore.pipe(distinctUntilChanged());

  public vm$ = combineLatest([this.activities$]).pipe(
    map(([activities]) => ({ activities }))
  );

  constructor(private api: ApiService) {
    this.criteria$.pipe(
      switchMap(() => this.fetchActivities()),
      untilDestroyed(this)
    ).subscribe(result => this.activitiesStore.next(result.data));
  }


  private fetchActivities() {
    return this.api.sendQuery<Activity[]>('api/activities');
  }
}
