import { DetailsCalendarFacadeService } from './details-calendar-facade.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

describe('DetailsCalendarFacadeService', () => {
  let spectator: SpectatorService<DetailsCalendarFacadeService>;
  const createService = createServiceFactory({
    service: DetailsCalendarFacadeService,
  });

  beforeEach(() => spectator = createService());

  it('should be created', () => {
    expect(spectator.service).not.toBeNull();
  });

});
