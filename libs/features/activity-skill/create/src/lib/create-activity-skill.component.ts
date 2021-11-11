import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { CreateActivitySkillFacadeService } from './create-activity-skill-facade.service';
import { ResourceId } from '@cheesecake-ui/core/api';

@Component({
  selector: 'cc-create-activity-skill[activityId]',
  template: `
    <div *ngIf='facade.vm$ | async as vm'>
      <div *ngFor='let skill of vm.skills'>
        <h2>{{skill.name}}</h2>
        <p>{{skill.description}}</p>
        <button (click)='facade.selectSkill(skill.id)'>select</button>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CreateActivitySkillFacadeService]
})
export class CreateActivitySkillComponent implements OnChanges {
  @Input()
  public activityId!: ResourceId;

  @Output()
  public skillSelected = new EventEmitter();

  constructor(public readonly facade: CreateActivitySkillFacadeService) {
    this.facade.submitted$.subscribe(() => this.skillSelected.emit())
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes?.activityId) {
      this.facade.updateCriteria(this.activityId);
    }
  }
}
