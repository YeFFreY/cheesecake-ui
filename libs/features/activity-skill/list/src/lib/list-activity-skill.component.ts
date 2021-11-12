import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivitySkill, ListActivitySkillFacadeService } from './list-activity-skill-facade.service';
import { ResourceId } from '@cheesecake-ui/core/api';

@Component({
  selector: 'cc-list-activity-skill[activityId]',
  template: `
    <ng-container *ngIf='facade.vm$ | async as vm'>
      <h3>Skills improved by this activity</h3>
      <div *ngFor='let skill of vm.skills; trackBy: trackBySkillId' class='skill-item'>
        <h4>{{skill.name}}</h4>
      </div>
      <div *ngIf='vm.skills.length === 0'>No Skills currently associated with the activity</div>
    </ng-container>
  `,
  styles: [`
    .skill-item {
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ListActivitySkillFacadeService]
})
export class ListActivitySkillComponent implements OnChanges {
  @Input()
  public activityId!: ResourceId;

  constructor(public readonly facade: ListActivitySkillFacadeService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.activityId) {
      this.facade.updateCriteria(this.activityId);
    }
  }

  trackBySkillId(index: number, skill: ActivitySkill) {
    return skill.id
  }

}
