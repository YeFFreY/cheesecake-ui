import { Component } from '@angular/core';
import { DetailsCalendarFacadeService } from './details-calendar-facade.service';
import { ActivatedRoute } from '@angular/router';
import { ResourceId } from '@cheesecake-ui/core/api';
import { map } from 'rxjs/operators';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'cc-details-calendar',
  template: `
    <p>
      Details of {{calendarId}}
      <a [routerLink]='["courses","new"]' class='button'>New Course</a>
    </p>
  `,
  styles: [],
  // no changedetection "on push" here
  providers: [DetailsCalendarFacadeService]
})
export class DetailsCalendarComponent {
  // todo : maybe I should get this one back from the facade.VM ?
  public calendarId?: ResourceId;

  constructor(public readonly facade: DetailsCalendarFacadeService, private readonly route: ActivatedRoute) {
    this.route.paramMap.pipe(map(params => params.get('calendarId'))).subscribe(calendarId => {
      if (calendarId) {
        this.calendarId = calendarId;
        this.facade.updateActivityId(this.calendarId);
      }
    });

  }

}
