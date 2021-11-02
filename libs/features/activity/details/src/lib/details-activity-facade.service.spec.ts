import { DetailsActivityFacadeService } from './details-activity-facade.service';
import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator/jest';
import { ApiService } from '@cheesecake-ui/core/api';
import { of } from 'rxjs';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('DetailsActivityFacadeService', () => {
  let spectator: SpectatorService<DetailsActivityFacadeService>;
  const createService = createServiceFactory({
    service: DetailsActivityFacadeService,
    providers: [
      mockProvider(ApiService, {
        sendQuery: () => of({ data: {} })
      })
    ]
  });

  beforeEach(() => spectator = createService());

  it('should be created and give no activity until id of activity given', () => {
    const vmSpy = subscribeSpyTo(spectator.service.vm$);
    expect(vmSpy.getValues()).toEqual([]);
  });

  it('should fetch activity when id given', () => {
    const vmSpy = subscribeSpyTo(spectator.service.vm$);

    spectator.service.updateActivityId('1');

    expect(vmSpy.getValues()).toEqual([{ activity: {} }]);
  });
});
