import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourceId } from '@cheesecake-ui/core/api';
import { DeleteActivitySkillFacadeService } from './delete-activity-skill-facade.service';

@Component({
  selector: 'cc-delete-activity-skill[activityId][skillId]',
  template: `
    <button (click)='delete()' class='button'>delete</button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DeleteActivitySkillFacadeService]
})
export class DeleteActivitySkillComponent {
  @Input()
  public activityId!: ResourceId;

  @Input()
  public skillId!: ResourceId;

  @Output()
  public skillDeleted = new EventEmitter<ResourceId>()

  constructor(private readonly facade: DeleteActivitySkillFacadeService) {
    this.facade.submitted$.subscribe(activityId => this.skillDeleted.emit(activityId));
  }


  public delete() {
    this.facade.updateCriteria(this.activityId, this.skillId);
  }
}
