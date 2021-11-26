import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  addHours,
  differenceInMinutes,
  eachDayOfInterval,
  eachHourOfInterval,
  endOfISOWeek,
  getHours,
  getISODay,
  getMinutes,
  isWithinInterval,
  startOfISOWeek
} from 'date-fns';
import { outputDateTimeFormat, outputShortDateDayFormat } from '@cheesecake-ui/utils/constants';

export interface Event {
  start: string;
  end: string;
  description: string;
}

interface LocEvent {
  y: number;
  height: number,
  start: string;
  end: string;
  description: string;
}

@Component({
  selector: 'cc-calendar[events][currentDate]',
  template: `
    <div class='week'>
      <div class='hours'>
        <div class='day-header'>&nbsp;</div>
        <div class='hour' *ngFor='let hour of hours'>{{hour | date: hourFormat}}</div>
      </div>
      <div class='day' *ngFor='let day of localizedEvents'>
        <div class='day-header'>{{day.date | date: dayFormat}}</div>
        <div class='day-body'>
          <div *ngFor='let event of day.events'
               (click)='eventSelected.emit()'
               class='event'
               [style.top.px]='event.y'
               [style.height.px]='event.height'>
            <p>{{event.start | date: hourFormat}} - {{event.end | date: hourFormat}} : {{event.description}}</p></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      height         : 100%;
      width          : 100%;
      display        : flex;
      flex-direction : column;
    }

    .hours {
      position     : relative;
      margin-top   : -15px;
      margin-right : var(--space-md);
    }

    .hours > .hour {
      height      : 30px;
      display     : flex;
      align-items : center;
      font-size   : var(--text-sm);
    }

    .week {
      display : flex;
    }

    .day {
      display        : flex;
      flex           : 1;
      flex-direction : column;
      border-right   : 1px solid var(--color-border);
    }

    .day-header {
      margin-bottom : 20px;
      font-weight   : var(--font-weight-bold);
      text-align    : center;
    }

    .day-body {
      display          : flex;
      flex             : 1;
      flex-direction   : column;
      position         : relative;
      background-size  : 30px 30px;
      background-image : linear-gradient(to bottom, lightgrey 1px, transparent 1px);

    }

    .event {
      position         : absolute;
      left             : 0;
      right            : 0;
      background-color : var(--color-primary-alpha50);
      border           : 1px solid var(--color-primary);
      color            : var(--white);
      border-radius    : 5px;
      padding          : var(--space-xxs);
      font-size        : var(--text-xs);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnChanges {
  @Input()
  public events!: Event[];
  @Input()
  public currentDate!: Date;
  @Input()
  public startWorkingDay = 7;
  @Input()
  public endWorkingDay = 20;
  @Output()
  public eventSelected = new EventEmitter<void>()

  hourFormat = outputDateTimeFormat;
  dayFormat = outputShortDateDayFormat;

  hours: Date[] = [];
  localizedEvents: { date: Date, events: LocEvent[] }[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const startOfWeek = startOfISOWeek(this.currentDate);
    const endOfWeek = endOfISOWeek(this.currentDate);
    this.hours = eachHourOfInterval({
      start: addHours(startOfWeek, this.startWorkingDay),
      end: addHours(startOfWeek, 24- (24 - this.endWorkingDay))
    });
    const interval = { start: startOfWeek, end: endOfWeek };
    const week: { date: Date, events: LocEvent[] }[] = eachDayOfInterval(interval).map(d => ({ date: d, events: [] }));
    if (changes?.events) {
      this.localizedEvents = this.events
        .filter(e => isWithinInterval(new Date(e.start), interval))
        .map(e => {
          const start = new Date(e.start);
          const end = new Date(e.end);
          const y = 30 * getHours(start) + (getMinutes(start) / 2) - (30 * this.startWorkingDay);
          const height = differenceInMinutes(end, start) / 2;
          return { ...e, y, height };
        }).reduce((acc, curr: LocEvent) => {
          const start = new Date(curr.start);
          const index = getISODay(start);
          week[index - 1].events.push(curr);
          return acc;
        }, week);

    }
  }

}
