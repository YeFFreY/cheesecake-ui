import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { ResourceId } from '@cheesecake-ui/core/api';
import { CreateActivityMaterialsFacadeService } from './create-activity-materials-facade.service';

@Component({
  selector: 'cc-create-activity-materials',
  template: `
    <div *ngIf='facade.vm$ | async as vm'>
      <div *ngFor='let equipment of vm.equipments'>
        <h2>{{equipment.name}}</h2>
        <p>{{equipment.description}}</p>
        <button (click)='facade.selectEquipment(equipment.id)'>select</button>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CreateActivityMaterialsFacadeService]
})
export class CreateActivityMaterialsComponent implements OnChanges {
  @Input()
  public activityId!: ResourceId;

  @Output()
  public materialsSelected = new EventEmitter();

  constructor(public readonly facade: CreateActivityMaterialsFacadeService) {
    this.facade.submitted$.subscribe(() => this.materialsSelected.emit());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.activityId) {
      this.facade.updateCriteria(this.activityId);
    }
  }
}
