import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivityMaterials, ListActivityMaterialsFacadeService } from './list-activity-materials-facade.service';
import { ResourceId } from '@cheesecake-ui/core/api';

@Component({
  selector: 'cc-list-activity-materials',
  template: `
    <ng-container *ngIf='facade.vm$ | async as vm'>
      <h3>Materials required</h3>
      <button (click)='openMaterialsDrawer()' id='btn-add-materials'>add materials</button>
      <div *ngFor='let equipment of vm.materials; trackBy: trackByEquipmentId' class='materials-item'>
        <h4>{{equipment.name}}</h4>
        <cc-delete-activity-materials [activityId]='activityId' [equipmentId]='equipment.id' (equipmentDeleted)='onMaterialsDeleted()'></cc-delete-activity-materials>
      </div>
      <div *ngIf='vm.materials.length === 0'>No Materials required for the activity</div>
    </ng-container>
    <cc-drawer [isOpen]='open' (drawerClosed)='open = false'>
      <ng-template ccDrawerHeader>
        <div><h3>Add Materials</h3></div>
      </ng-template>
      <ng-template ccDrawerBody>
        <cc-create-activity-materials *ngIf='activityId'
                                      [activityId]='activityId'
                                      (materialsSelected)='onMaterialsSelected()'></cc-create-activity-materials>
      </ng-template>
    </cc-drawer>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ListActivityMaterialsFacadeService]
})
export class ListActivityMaterialsComponent implements OnChanges {
  public open = false;

  @Input()
  public activityId!: ResourceId;

  constructor(public readonly facade: ListActivityMaterialsFacadeService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.activityId) {
      this.refreshMaterials();
    }
  }

  trackByEquipmentId(index: number, materials: ActivityMaterials) {
    return materials.id;
  }

  onMaterialsDeleted() {
    this.refreshMaterials()
  }

  onMaterialsSelected() {
    this.closeMaterialsDrawer();
    this.refreshMaterials();
  }

  private refreshMaterials() {
    this.facade.updateCriteria(this.activityId);
  }

  public openMaterialsDrawer() {
    this.open = true;
  }

  private closeMaterialsDrawer() {
    this.open = false;
  }

}
