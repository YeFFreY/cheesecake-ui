import { Injectable } from '@angular/core';
import { ApiService, Resource } from '@cheesecake-ui/core/api';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

export interface Calendar extends Resource {
  name: string;
  description: string;
}

@UntilDestroy()
@Injectable()
export class ListCalendarFacadeService {

  private calendarsStore = new BehaviorSubject<Calendar[]>([]);
  private criteriaStore = new BehaviorSubject<string>('');

  private calendars$ = this.calendarsStore.pipe(distinctUntilChanged());
  private criteria$ = this.criteriaStore.pipe(distinctUntilChanged());

  public vm$ = combineLatest([this.calendars$]).pipe(
    map(([calendars]) => ({ calendars }))
  );

  constructor(private api: ApiService) {
    this.criteria$.pipe(
      switchMap(() => this.fetchCalendars()),
      untilDestroyed(this)
    ).subscribe(result => this.calendarsStore.next(result.data));
  }


  private fetchCalendars() {
    return this.api.sendQuery<Calendar[]>('api/calendars');
  }
}
