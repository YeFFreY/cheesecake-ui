import {
  CreateActivityVariantCommand,
  CreateActivityVariantFacadeService
} from './create-activity-variant-facade.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '@cheesecake-ui/core/api';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { of } from 'rxjs';

describe('CreateActivityVariantFacadeService', () => {
  let spectator: SpectatorService<CreateActivityVariantFacadeService>;
  const createService = createServiceFactory({
    service: CreateActivityVariantFacadeService,
    imports: [ReactiveFormsModule],
    mocks: [ApiService]
  });

  beforeEach(() => spectator = createService());


  it('should inform component when variant is associated to activity successfully', () => {
    const submittedSpy = subscribeSpyTo(spectator.service.submitted$);
    spectator.inject(ApiService).sendCommand.andReturn(of({}));

    spectator.service.updateCriteria('1');
    spectator.service.form.patchValue({ name: 'test', description: 'test' } as CreateActivityVariantCommand);
    expect(submittedSpy.getValues()).toEqual([]);

    spectator.service.submit()
    expect(submittedSpy.getValues()).toEqual([undefined]);

  });
});
