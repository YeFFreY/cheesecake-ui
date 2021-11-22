import { ListCalendarFacadeService } from './list-calendar-facade.service';
import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator/jest';
import { ApiService } from '@cheesecake-ui/core/api';
import { of } from 'rxjs';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('ListCalendarFacadeService', () => {
  let spectator: SpectatorService<ListCalendarFacadeService>;
  const createService = createServiceFactory({
    service: ListCalendarFacadeService,
    providers: [
      mockProvider(ApiService, {
        sendQuery: () => of({ data: [{}, {}] })
      })
    ]
  });

  beforeEach(() => spectator = createService());

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should immediately fetch calendars', () => {
    const vmSpy = subscribeSpyTo(spectator.service.vm$);
    expect(vmSpy.getValues()).toEqual([{ calendars: [{}, {}] }]);
  });
});
