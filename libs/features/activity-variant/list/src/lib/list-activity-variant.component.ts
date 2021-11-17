import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivityVariant, ListActivityVariantFacadeService } from './list-activity-variant-facade.service';
import { ResourceId } from '@cheesecake-ui/core/api';

@Component({
  selector: 'cc-list-activity-variant[activityId]',
  template: `
    <ng-container *ngIf='facade.vm$ | async as vm'>
      <h3>Variants </h3>
      <div *ngFor='let variant of vm.variants; trackBy: trackByVariantId' class='variant-item'>
        <h4>{{variant.name}}</h4>
        <div>{{variant.description}}</div>
      </div>
      <div *ngIf='vm.variants.length === 0'>No variants defined for this activity</div>
    </ng-container>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ListActivityVariantFacadeService]
})
export class ListActivityVariantComponent implements OnChanges {
  @Input()
  public activityId!: ResourceId;

  constructor(public readonly facade: ListActivityVariantFacadeService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.activityId) {
      this.refreshVariants();
    }
  }

  trackByVariantId(index: number, variant: ActivityVariant) {
    return variant.id;
  }

  private refreshVariants() {
    this.facade.updateCriteria(this.activityId);
  }

}
