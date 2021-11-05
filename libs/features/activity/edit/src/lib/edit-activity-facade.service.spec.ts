import { EditActivityFacadeService } from './edit-activity-facade.service';
import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator/jest';
import { ApiService } from '@cheesecake-ui/core/api';
import { of } from 'rxjs';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { ReactiveFormsModule } from '@angular/forms';

describe('EditActivityFacadeService', () => {
  let spectator: SpectatorService<EditActivityFacadeService>;
  const createService = createServiceFactory({
    service: EditActivityFacadeService,
    imports: [ReactiveFormsModule],
    providers: [
      mockProvider(ApiService, {
        sendQuery: jest.fn(() => of({ data: {name: 'test', description: 'test'} })),
        sendCommand: jest.fn(() => of({}))
      })
    ]
  });

  beforeEach(() => spectator = createService());

  it('should be created and give no activity until id of activity given', () => {
    const vmSpy = subscribeSpyTo(spectator.service.vm$);
    expect(vmSpy.getValues()).toEqual([{ error: null}]);
    expect(spectator.inject(ApiService).sendQuery).not.toBeCalled();
  });

  it('should fetch activity when id given', () => {
    spectator.service.updateActivityId('1');
    expect(spectator.inject(ApiService).sendQuery).toHaveBeenCalledTimes(1);
  });


  it('should NOT submit data when submit button called without having first fetched valid data', () => {
    const submitSpy = subscribeSpyTo(spectator.service.submitted$);
    // we do not give an activity id, so facade is not fetching initial data
    spectator.service.submit(); // calling submit will not trigger api call
    expect(spectator.inject(ApiService).sendCommand).not.toBeCalled();
    expect(submitSpy.getValues()).toEqual([]);
  });

  it('should submit data when submit button called with valid data', () => {
    const submitSpy = subscribeSpyTo(spectator.service.submitted$);
    spectator.service.updateActivityId('1');
    spectator.service.submit();
    expect(spectator.inject(ApiService).sendCommand).toHaveBeenCalledTimes(1);
    expect(submitSpy.getValues()).toEqual([undefined]);
  })

});
