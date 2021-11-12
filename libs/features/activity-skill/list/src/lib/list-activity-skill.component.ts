import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivitySkill, ListActivitySkillFacadeService } from './list-activity-skill-facade.service';
import { ResourceId } from '@cheesecake-ui/core/api';

@Component({
  selector: 'cc-list-activity-skill[activityId]',
  template: `
    <ng-container *ngIf='facade.vm$ | async as vm'>
      <h3>Skills improved by this activity</h3>
      <button (click)='openSkillDrawer()' id='btn-add-skill'>add skill</button>
      <div *ngFor='let skill of vm.skills; trackBy: trackBySkillId' class='skill-item'>
        <h4>{{skill.name}}</h4>
        <cc-delete-activity-skill [activityId]='activityId'
                                  [skillId]='skill.id'
                                  (skillDeleted)='onSkillDeleted()'></cc-delete-activity-skill>
      </div>
      <div *ngIf='vm.skills.length === 0'>No Skills currently associated with the activity</div>
    </ng-container>
    <cc-drawer [isOpen]='open' (drawerClosed)='open = false'>
      <ng-template ccDrawerHeader>
        <div ><h3>Add skill</h3></div>
      </ng-template>
      <ng-template ccDrawerBody>
        <cc-create-activity-skill *ngIf='activityId' [activityId]='activityId' (skillSelected)='onSkillSelected()'></cc-create-activity-skill>
      </ng-template>
    </cc-drawer>
  `,
  styles: [`
    .skill-item {
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ListActivitySkillFacadeService]
})
export class ListActivitySkillComponent implements OnChanges {
  public open = false;

  @Input()
  public activityId!: ResourceId;

  constructor(public readonly facade: ListActivitySkillFacadeService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.activityId) {
      this.refreshSkills()
    }
  }

  trackBySkillId(index: number, skill: ActivitySkill) {
    return skill.id;
  }

  onSkillDeleted() {
    this.refreshSkills()
  }


  onSkillSelected() {
    this.closeSkillDrawer();
    this.refreshSkills()
  }

  private refreshSkills() {
    this.facade.updateCriteria(this.activityId);
  }

  public openSkillDrawer() {
    this.open = true;
  }

  private closeSkillDrawer() {
    this.open = false;
  }

}
