import { DetailsCalendarComponent } from './details-calendar.component';
import { createRoutingFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { DetailsCalendarFacadeService } from './details-calendar-facade.service';

describe('DetailsCalendarComponent', () => {
  let spectator: Spectator<DetailsCalendarComponent>;
  const createComponent = createRoutingFactory({
    component: DetailsCalendarComponent,
    params: { calendarId: '1' },
    componentProviders: [
      mockProvider(DetailsCalendarFacadeService)
    ]
  });

  beforeEach(async () => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display calendar details', () => {
    expect(spectator.query('a')).toHaveText('New Course');
  });
});
