import { CreateClassCommand, CreateClassFacadeService } from './create-class-facade.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '@cheesecake-ui/core/api';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { of } from 'rxjs';

describe('CreateClassFacadeService', () => {
  let spectator: SpectatorService<CreateClassFacadeService>;
  const createService = createServiceFactory({
    service: CreateClassFacadeService,
    imports: [ReactiveFormsModule],
    mocks: [ApiService]
  });

  beforeEach(() => spectator = createService());

  it('should inform component when class created successfully', () => {
    const submittedSpy = subscribeSpyTo(spectator.service.submitted$);

    spectator.inject(ApiService).sendCommand.andReturn(of({}));
    spectator.service.form.patchValue({ name: 'test', description: 'test' } as CreateClassCommand);
    expect(submittedSpy.getValues()).toEqual([]);

    spectator.service.submit();
    expect(submittedSpy.getValues()).toEqual([undefined]);

  });
});
