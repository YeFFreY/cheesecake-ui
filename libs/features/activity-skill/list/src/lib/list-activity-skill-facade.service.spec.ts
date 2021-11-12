import { ListActivitySkillFacadeService } from './list-activity-skill-facade.service';
import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator/jest';
import { ApiService } from '@cheesecake-ui/core/api';
import { of } from 'rxjs';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('ListActivitySkillFacadeService', () => {
  let spectator: SpectatorService<ListActivitySkillFacadeService>;
  const createService = createServiceFactory({
    service: ListActivitySkillFacadeService,
    providers: [
      mockProvider(ApiService, {
        sendQuery: () => of({ data: [{}] })
      })
    ]
  });

  beforeEach(() => spectator = createService());

  it('should be created and give no skills until id of activity given', () => {
    const vmSpy = subscribeSpyTo(spectator.service.vm$);
    expect(vmSpy.getValues()).toEqual([]);
  });

  it('should fetch skills when id given', () => {
    const vmSpy = subscribeSpyTo(spectator.service.vm$);

    spectator.service.updateCriteria('1');

    expect(vmSpy.getValues()).toEqual([{ skills: [{}] }]);
  });
});
