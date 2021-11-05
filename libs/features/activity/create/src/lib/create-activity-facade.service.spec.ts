import { CreateActivityFacadeService } from './create-activity-facade.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '@cheesecake-ui/core/api';
import { CreateActivityCommand } from './create-activity.domain';
import { of } from 'rxjs';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('CreateActivityFacadeService', () => {
  let spectator: SpectatorService<CreateActivityFacadeService>;
  const createService = createServiceFactory({
    service: CreateActivityFacadeService,
    imports: [ReactiveFormsModule],
    mocks: [ApiService]
  });

  beforeEach(() => spectator = createService());

  it('should inform component when activity created successfully', () => {
    const submittedSpy = subscribeSpyTo(spectator.service.submitted$);

    spectator.inject(ApiService).sendCommand.andReturn(of({}));
    spectator.service.form.patchValue({ name: 'test', description: 'test' } as CreateActivityCommand);
    expect(submittedSpy.getValues()).toEqual([]);

    spectator.service.submit();
    expect(submittedSpy.getValues()).toEqual([undefined]);

  });
});
