import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { ApiService, Resource, ResourceId } from '@cheesecake-ui/core/api';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export interface ActivitySkill extends Resource {
  name: string;
}

@UntilDestroy()
@Injectable()
export class ListActivitySkillFacadeService {
  private skillsStore = new Subject<ActivitySkill[]>();
  private criteriaStore = new Subject<ResourceId>();

  private skills$ = this.skillsStore.asObservable().pipe(distinctUntilChanged());
  private criteria$ = this.criteriaStore.asObservable();

  public vm$ : Observable<{skills: ActivitySkill[]}> = combineLatest([this.skills$]).pipe(
    map(([skills]) => ({ skills }))
  );
  constructor(private api: ApiService) {
    this.criteria$.pipe(
      switchMap(activityId => this.fetchSkills(activityId)),
      untilDestroyed(this)
    ).subscribe(result => this.skillsStore.next(result.data));
  }

  private fetchSkills(activityId: ResourceId) {
    return this.api.sendQuery<ActivitySkill[]>(`api/activity-skills/${activityId}`);
  }

  public updateCriteria(activityId: ResourceId) {
    this.criteriaStore.next(activityId);
  }
}
