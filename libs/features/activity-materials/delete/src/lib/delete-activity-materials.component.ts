import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DeleteActivityMaterialsFacadeService } from './delete-activity-materials-facade.service';
import { ResourceId } from '@cheesecake-ui/core/api';

@Component({
  selector: 'cc-delete-activity-materials[activityId][equipmentId]',
  template: `
    <button (click)='delete()' class='button'>delete</button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DeleteActivityMaterialsFacadeService]
})
export class DeleteActivityMaterialsComponent {
  @Input()
  public activityId!: ResourceId;

  @Input()
  public equipmentId!: ResourceId;

  @Output()
  public equipmentDeleted = new EventEmitter<ResourceId>();

  constructor(private readonly facade: DeleteActivityMaterialsFacadeService) {
    this.facade.submitted$.subscribe(activityId => this.equipmentDeleted.emit(activityId));
  }


  public delete() {
    this.facade.updateCriteria(this.activityId, this.equipmentId);
  }
}
