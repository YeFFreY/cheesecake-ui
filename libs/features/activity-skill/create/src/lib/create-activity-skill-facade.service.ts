import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ApiService, Resource, ResourceId } from '@cheesecake-ui/core/api';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export interface Skill extends Resource {
  name: string;
  description: string;
}

@UntilDestroy()
@Injectable()
export class CreateActivitySkillFacadeService {
  private skillsStore = new BehaviorSubject<Skill[]>([]);
  private criteriaStore = new Subject<ResourceId>();
  private selectionStore = new Subject<ResourceId>();
  private submittedSubject: Subject<ResourceId> = new Subject<ResourceId>();

  private skills$ = this.skillsStore.pipe(distinctUntilChanged());
  private criteria$ = this.criteriaStore.pipe(distinctUntilChanged());
  private selection$ = this.selectionStore.pipe(distinctUntilChanged());

  public readonly submitted$ = this.submittedSubject.asObservable();

  public vm$ = combineLatest([this.skills$]).pipe(
    map(([skills]) => ({ skills }))
  );

  constructor(private api: ApiService) {
    this.criteria$.pipe(
      switchMap(activityId => this.fetchAvailableSkills(activityId)),
      untilDestroyed(this)
    ).subscribe(result => this.skillsStore.next(result.data));

    combineLatest([this.criteria$, this.selection$]).pipe(
      switchMap(([activityId, skillId]) => this.createActivitySkill(activityId, skillId)),
      untilDestroyed(this)
    ).subscribe((response) => {
      this.submittedSubject.next(response.data);
    });
  }

  public selectSkill(skillId: ResourceId) {
    this.selectionStore.next(skillId);
  }

  private fetchAvailableSkills(activityId: ResourceId) {
    return this.api.sendQuery<Skill[]>(`api/activity-skills/available/${activityId}`);
  }

  private createActivitySkill(activityId: ResourceId, skillId: ResourceId) {
    return this.api.sendCommand<ResourceId>('api/activity-skills', { activityId, skillId });
  }

  updateCriteria(activityId: ResourceId) {
    this.criteriaStore.next(activityId);
  }
}
