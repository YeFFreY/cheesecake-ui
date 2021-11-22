import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListCalendarFacadeService } from './list-calendar-facade.service';

@Component({
  selector: 'cc-list-calendar',
  template: `
    <h1>Calendars</h1>
    <a [routerLink]='["new"]' class='button'>New Calendar</a>
    <div *ngIf='facade.vm$ | async as vm' class='container'>
      <div class='calendars'>
        <div *ngFor='let calendar of vm.calendars'>
          <a [routerLink]='[calendar.id]' class='unstyled' routerLinkActive='active'><h2>{{calendar.name}}</h2></a>
          <p>{{calendar.description}}</p>
        </div>
      </div>
      <div class='calendar-details'>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    :host {
      height : 100%;
      width  : 100%;
    }

    .container {
      height                : 100%;
      width                 : 100%;
      display               : grid;
      grid-gap              : var(--space-xs);
      grid-template-areas   : "filter"
                              "content";
      grid-template-columns : 1fr;
    }

    .calendars {
      grid-area : filter;
    }

    .calendar-details {
      grid-area : content;
    }

    a {
      display: inline-block;
    }

    .active {
      background-color: var(--color-primary-alpha50);
    }

    @media (min-width : 50rem) {
      .container {
        grid-gap              : var(--space-md);
        grid-template-areas   : "filter content";
        grid-template-columns : 1fr 2fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ListCalendarFacadeService]
})
export class ListCalendarComponent {

  constructor(public readonly facade: ListCalendarFacadeService) {
  }

}
