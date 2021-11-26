import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { ApiService, ResourceId } from '@cheesecake-ui/core/api';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

export interface CalendarEvent {
  start: string;
  end: string;
  description: string;
  type: string;
}

@UntilDestroy()
@Injectable()
export class DetailsCalendarFacadeService {
  private calendarIdStore = new Subject<ResourceId>();
  private calendarDateStore = new BehaviorSubject<Date>(new Date());

  private eventsStore = new Subject<CalendarEvent[]>();

  private calendarId$ = this.calendarIdStore.asObservable().pipe(distinctUntilChanged());
  private calendarDate$ = this.calendarDateStore.asObservable().pipe(distinctUntilChanged());
  private events$ = this.eventsStore.asObservable().pipe(distinctUntilChanged());

  public vm$: Observable<{ events: CalendarEvent[], calendarDate: Date }> = combineLatest([this.events$, this.calendarDate$]).pipe(
    map(([events, calendarDate]) => ({ events, calendarDate })),
    untilDestroyed(this)
  );


  constructor(private api: ApiService) {
    combineLatest([this.calendarId$, this.calendarDate$]).pipe(
      switchMap(([calendarId, calendarDate]) => this.fetchEvents(calendarId, calendarDate)),
      untilDestroyed(this)
    ).subscribe(result => {
      this.eventsStore.next(result.data);
    });
  }

  private fetchEvents(calendarId: ResourceId, calendarDate: Date) {
    return this.api.sendQuery<CalendarEvent[]>(`api/events/${calendarId}?date=${encodeURIComponent(calendarDate.toISOString())}`);
  }


  public updateCalendarId(id: ResourceId) {
    this.calendarIdStore.next(id);
  }

  public updateCalendarDate(date: Date) {
    this.calendarDateStore.next(date);
  }
}
