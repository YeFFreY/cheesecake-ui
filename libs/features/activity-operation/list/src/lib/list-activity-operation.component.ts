import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivityOperation, ListActivityOperationFacadeService } from './list-activity-operation-facade.service';
import { ResourceId } from '@cheesecake-ui/core/api';

@Component({
  selector: 'cc-list-activity-operation[activityId]',
  template: `
    <ng-container *ngIf='facade.vm$ | async as vm'>
      <h3>Operations </h3>
      <div *ngFor='let operation of vm.operations; trackBy: trackByOperationId' class='operation-item'>
        <h4>{{operation.typeDescription}}</h4>
        <div>{{operation.description}}</div>
      </div>
      <div *ngIf='vm.operations.length === 0'>No operations defined for this activity</div>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ListActivityOperationFacadeService]
})
export class ListActivityOperationComponent implements OnChanges {

  @Input()
  public activityId!: ResourceId;

  constructor(public readonly facade: ListActivityOperationFacadeService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.activityId) {
      this.refreshOperations();
    }
  }

  trackByOperationId(index: number, operation: ActivityOperation) {
    return operation.typeId;
  }


  private refreshOperations() {
    this.facade.updateCriteria(this.activityId);
  }
}
