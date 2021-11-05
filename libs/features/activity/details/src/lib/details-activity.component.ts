import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DetailsActivityFacadeService } from './details-activity-facade.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cc-details-activity',
  template: `
    <div *ngIf='facade.vm$ | async as vm'>
      <a routerLink='../edit' class='button'>Edit</a>
      <h2>{{vm.activity?.name}}</h2>
      <p>{{vm.activity?.description}}</p>
    </div>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DetailsActivityFacadeService]
})
export class DetailsActivityComponent {

  constructor(public readonly facade: DetailsActivityFacadeService, private readonly route: ActivatedRoute) {
    const activityId = this.route.snapshot.paramMap.get('id');
    if (activityId) {
      this.facade.updateActivityId(activityId);
    }
  }

}
