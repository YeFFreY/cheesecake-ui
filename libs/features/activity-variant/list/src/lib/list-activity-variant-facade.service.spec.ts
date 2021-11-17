import { ListActivityVariantFacadeService } from './list-activity-variant-facade.service';
import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator/jest';
import { ApiService } from '@cheesecake-ui/core/api';
import { of } from 'rxjs';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('ListActivityVariantFacadeService', () => {
  let spectator: SpectatorService<ListActivityVariantFacadeService>;
  const createService = createServiceFactory({
    service: ListActivityVariantFacadeService,
    providers: [
      mockProvider(ApiService, {
        sendQuery: () => of({ data: [{}] })
      })
    ]
  });

  beforeEach(() => spectator = createService());

  it('should be created and list no variants until id of activity given', () => {
    const vmSpy = subscribeSpyTo(spectator.service.vm$);
    expect(vmSpy.getValues()).toEqual([]);
  });

  it('should fetch variants when id given', () => {
    const vmSpy = subscribeSpyTo(spectator.service.vm$);

    spectator.service.updateCriteria('1');

    expect(vmSpy.getValues()).toEqual([{ variants: [{}] }]);
  });
});
