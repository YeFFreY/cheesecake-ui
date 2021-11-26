import { DetailsCalendarComponent } from './details-calendar.component';
import { createRoutingFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { DetailsCalendarFacadeService } from './details-calendar-facade.service';
import { SharedComponentsCalendarModule } from '@cheesecake-ui/shared/components/calendar';
import { of } from 'rxjs';

describe('DetailsCalendarComponent', () => {
  let spectator: Spectator<DetailsCalendarComponent>;
  const createComponent = createRoutingFactory({
    component: DetailsCalendarComponent,
    imports:[SharedComponentsCalendarModule],
    params: { calendarId: '1' },
    componentProviders: [mockProvider(DetailsCalendarFacadeService, {
      vm$: of({
        events: [],
        calendarDate: new Date()
      })
    })]
  });

  beforeEach(async () => spectator = createComponent());

  it('should display calendar details', () => {
    expect(spectator.query('a')).toHaveText('New Course');
    expect(spectator.query('input[type=date]')).not.toBeNull();
    expect(spectator.query('cc-calendar')).not.toBeNull();
  });
});
