import { Component } from '@angular/core';
import { DetailsCalendarFacadeService } from './details-calendar-facade.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { inputDateFormat } from '@cheesecake-ui/utils/constants';

@UntilDestroy()
@Component({
  selector: 'cc-details-calendar',
  template: `
    <div *ngIf='facade.vm$ | async as vm'>
      <h1>Calendar</h1>
      <a [routerLink]='["courses","new"]' class='button'>New Course</a>
      <input type='date' [value]='vm.calendarDate | date: dateFormat' (change)='onDateChanged($event)'>
      <cc-calendar [events]='vm.events' [currentDate]='vm.calendarDate' (eventSelected)='showDetails()'></cc-calendar>
    </div>
  `,
  styles: [`
    :host {
      height : 100%;
      width  : 100%;
    }
  `],
  // no changedetection "on push" here
  providers: [DetailsCalendarFacadeService]
})
export class DetailsCalendarComponent {
  public dateFormat = inputDateFormat

  constructor(public readonly facade: DetailsCalendarFacadeService, private readonly route: ActivatedRoute) {
    this.route.paramMap.pipe(
      map(params => params.get('calendarId')),
      untilDestroyed(this)
    ).subscribe(calendarId => {
      if (calendarId) {
        this.facade.updateCalendarId(calendarId);
      }
    });
  }

  onDateChanged($event: Event) {
    this.facade.updateCalendarDate(new Date((<HTMLInputElement>$event.target)?.value))
  }

  showDetails() {
    alert('yop yop !');
  }
}
