import { DetailsCourseFacadeService } from './details-course-facade.service';
import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator/jest';
import { ApiService } from '@cheesecake-ui/core/api';
import { of } from 'rxjs';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('DetailsCourseFacadeService', () => {
  let spectator: SpectatorService<DetailsCourseFacadeService>;
  const createService = createServiceFactory({
    service: DetailsCourseFacadeService,
    providers: [
      mockProvider(ApiService, {
        sendQuery: () => of({ data: {} })
      })
    ]
  });

  beforeEach(() => spectator = createService());

  it('should be created and give no course until id of course given', () => {
    const vmSpy = subscribeSpyTo(spectator.service.vm$);
    expect(vmSpy.getValues()).toEqual([]);
  });

  it('should fetch course when id given', () => {
    const vmSpy = subscribeSpyTo(spectator.service.vm$);

    spectator.service.updateCriteria('1');

    expect(vmSpy.getValues()).toEqual([{ course: {} }]);
  });
});
