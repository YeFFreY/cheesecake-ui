import {
  CreateActivityOperationCommand,
  CreateActivityOperationFacadeService
} from './create-activity-operation-facade.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '@cheesecake-ui/core/api';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { of } from 'rxjs';

describe('CreateActivityOperationFacadeService', () => {
  let spectator: SpectatorService<CreateActivityOperationFacadeService>;
  const createService = createServiceFactory({
    service: CreateActivityOperationFacadeService,
    imports: [ReactiveFormsModule],
    mocks: [ApiService]
  });

  beforeEach(() => spectator = createService());


  it('should inform component when operation is associated to activity successfully', () => {
    const submittedSpy = subscribeSpyTo(spectator.service.submitted$);
    spectator.inject(ApiService).sendCommand.andReturn(of({}));

    spectator.service.updateCriteria('1');
    spectator.service.form.patchValue({ type: 'test', description: 'test' } as CreateActivityOperationCommand);
    expect(submittedSpy.getValues()).toEqual([]);

    spectator.service.submit()
    expect(submittedSpy.getValues()).toEqual([undefined]);

  });

});
