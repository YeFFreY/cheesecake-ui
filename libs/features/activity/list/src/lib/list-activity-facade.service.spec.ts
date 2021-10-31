import { ListActivityFacadeService } from './list-activity-facade.service';
import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator/jest';
import { ApiService } from '@cheesecake-ui/core/api';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { of } from 'rxjs';

describe('ListActivityFacadeService', () => {
  let spectator: SpectatorService<ListActivityFacadeService>;
  const createService = createServiceFactory({
    service: ListActivityFacadeService,
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

  it('should immediately fetch services', () => {
    const vmSpy = subscribeSpyTo(spectator.service.vm$);
    expect(vmSpy.getValues()).toEqual([{ activities: [{}, {}] }]);
  });
});
