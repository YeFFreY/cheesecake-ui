import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DetailsActivityFacadeService } from './details-activity-facade.service';
import { ActivatedRoute } from '@angular/router';
import { ResourceId } from '@cheesecake-ui/core/api';

@Component({
  selector: 'cc-details-activity',
  template: `
    <div *ngIf='facade.vm$ | async as vm'>
      <a routerLink='../edit' class='button'>Edit</a>
      <h2>{{vm.activity?.name}}</h2>
      <p>{{vm.activity?.description}}</p>
      <button (click)='open = true'>add skill</button>
      <cc-list-activity-skill *ngIf='activityId' [activityId]='activityId'></cc-list-activity-skill>
    </div>
    <cc-drawer [isOpen]='open' (drawerClosed)='open = false'>
      <ng-template ccDrawerHeader>
        <div ><h3>Add skill</h3></div>
      </ng-template>
      <ng-template ccDrawerBody>
        <cc-create-activity-skill *ngIf='activityId' [activityId]='activityId' (skillSelected)='open = false'></cc-create-activity-skill>
      </ng-template>
    </cc-drawer>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DetailsActivityFacadeService]
})
export class DetailsActivityComponent {
  public open = false;
  public activityId?: ResourceId;

  constructor(public readonly facade: DetailsActivityFacadeService, private readonly route: ActivatedRoute) {
    const activityId = this.route.snapshot.paramMap.get('id');
    if (activityId) {
      this.activityId = activityId;
      this.facade.updateActivityId(this.activityId);
    }
  }

}
