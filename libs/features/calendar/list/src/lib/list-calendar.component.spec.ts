import { ListCalendarComponent } from './list-calendar.component';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ListCalendarFacadeService } from './list-calendar-facade.service';

describe('ListCalendarComponent', () => {
  let spectator: Spectator<ListCalendarComponent>;
  const createComponent = createComponentFactory({
    component: ListCalendarComponent,
    imports: [RouterTestingModule],
    componentProviders: [
      mockProvider(ListCalendarFacadeService, {
        vm$: of({ calendars: [{ name: 'test', description: 'test' }] })
      })
    ]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.query('h1')).toHaveText('Calendars');
    expect(spectator.query('.calendars')?.children.length).toEqual(1);
    expect(spectator.queryAll('.calendars > div > a > h2')).toHaveText(['test']);
  });
});
