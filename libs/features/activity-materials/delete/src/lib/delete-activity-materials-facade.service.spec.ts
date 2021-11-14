import { DeleteActivityMaterialsFacadeService } from './delete-activity-materials-facade.service';
import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator/jest';
import { ApiService } from '@cheesecake-ui/core/api';
import { of } from 'rxjs';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('DeleteActivityMaterialsFacadeService', () => {
  let spectator: SpectatorService<DeleteActivityMaterialsFacadeService>;
  const createService = createServiceFactory({
    service: DeleteActivityMaterialsFacadeService,
    providers: [
      mockProvider(ApiService, {
        sendCommand: jest.fn(() => of({ data: {} }))
      })
    ]
  });

  beforeEach(() => spectator = createService());

  it('should not call delete api when no activity id and no equipment id given', () => {
    const submittedSpy = subscribeSpyTo(spectator.service.submitted$);
    expect(spectator.inject(ApiService).sendCommand).not.toBeCalled();
    expect(submittedSpy.getValues()).toEqual([]);
  });

  it('should call delete api when activity id and equipment id given', () => {
    const submittedSpy = subscribeSpyTo(spectator.service.submitted$);
    spectator.service.updateCriteria('1', '1');
    expect(spectator.inject(ApiService).sendCommand).toHaveBeenCalledTimes(1);
    expect(submittedSpy.getValues()).toEqual([{}]);
  });
});
