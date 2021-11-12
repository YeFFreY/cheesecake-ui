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
      <cc-list-activity-skill *ngIf='activityId' [activityId]='activityId'></cc-list-activity-skill>
    </div>

  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DetailsActivityFacadeService]
})
export class DetailsActivityComponent {
  public activityId?: ResourceId;

  constructor(public readonly facade: DetailsActivityFacadeService, private readonly route: ActivatedRoute) {
    const activityId = this.route.snapshot.paramMap.get('id');
    if (activityId) {
      this.activityId = activityId;
      this.facade.updateActivityId(this.activityId);
    }
  }

}
