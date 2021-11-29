import { DeleteCourseActivityFacadeService } from './delete-course-activity-facade.service';
import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator/jest';
import { ApiService } from '@cheesecake-ui/core/api';
import { of } from 'rxjs';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('DeleteCourseActivityFacadeService', () => {
  let spectator: SpectatorService<DeleteCourseActivityFacadeService>;
  const createService = createServiceFactory({
    service: DeleteCourseActivityFacadeService,
    providers: [
      mockProvider(ApiService, {
        sendCommand: jest.fn(() => of({ data: {} }))
      })
    ]
  });

  beforeEach(() => spectator = createService());

  it('should not call delete api when no activity id, course Id and no section type id given', () => {
    const submittedSpy = subscribeSpyTo(spectator.service.submitted$);
    expect(spectator.inject(ApiService).sendCommand).not.toBeCalled();
    expect(submittedSpy.getValues()).toEqual([]);
  });

  it('should call delete api when all criteria given', () => {
    const submittedSpy = subscribeSpyTo(spectator.service.submitted$);
    spectator.service.updateCriteria('1', '1', 'COOL_DOWN');
    expect(spectator.inject(ApiService).sendCommand).toHaveBeenCalledTimes(1);
    expect(submittedSpy.getValues()).toEqual([{}]);
  });
});
