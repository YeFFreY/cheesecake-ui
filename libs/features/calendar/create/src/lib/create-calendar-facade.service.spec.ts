import { CreateCalendarCommand, CreateCalendarFacadeService } from './create-calendar-facade.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '@cheesecake-ui/core/api';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { of } from 'rxjs';

describe('CreateCalendarFacadeService', () => {
  let spectator: SpectatorService<CreateCalendarFacadeService>;
  const createService = createServiceFactory({
    service: CreateCalendarFacadeService,
    imports: [ReactiveFormsModule],
    mocks: [ApiService]
  });

  beforeEach(() => spectator = createService());

  it('should inform component when calendar created successfully', () => {
    const submittedSpy = subscribeSpyTo(spectator.service.submitted$);

    spectator.inject(ApiService).sendCommand.andReturn(of({}));
    spectator.service.form.patchValue({ name: 'test', description: 'test' } as CreateCalendarCommand);
    expect(submittedSpy.getValues()).toEqual([]);

    spectator.service.submit();
    expect(submittedSpy.getValues()).toEqual([undefined]);

  });
});
