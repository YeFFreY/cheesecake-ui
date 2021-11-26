import { DetailsCalendarFacadeService } from './details-calendar-facade.service';
import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator/jest';
import { ApiService } from '@cheesecake-ui/core/api';
import { of } from 'rxjs';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('DetailsCalendarFacadeService', () => {
  let spectator: SpectatorService<DetailsCalendarFacadeService>;
  const createService = createServiceFactory({
    service: DetailsCalendarFacadeService,
    providers: [
      mockProvider(ApiService, {
        sendQuery: () => of({ data: [{}] })
      })
    ]
  });

  beforeEach(() => spectator = createService());

  it('should be created and list no events until id of calendar given', () => {
    const vmSpy = subscribeSpyTo(spectator.service.vm$);
    expect(vmSpy.getValues()).toEqual([]);
  });

  it('should fetch events when calendar id given', () => {
    const vmSpy = subscribeSpyTo(spectator.service.vm$);
    const today = new Date();

    spectator.service.updateCalendarId('1');
    spectator.service.updateCalendarDate(today);

    expect(vmSpy.getValues()).toHaveLength(3);
    expect(vmSpy.getLastValue()).toEqual({ calendarDate: today, events: [{}]});

  });
});
