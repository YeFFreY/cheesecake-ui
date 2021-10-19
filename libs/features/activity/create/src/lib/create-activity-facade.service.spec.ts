import { CreateActivityFacadeService } from './create-activity-facade.service';
import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '@cheesecake-ui/core/api';
import { Router } from '@angular/router';
import { CreateActivityCommand } from './create-activity.domain';
import { of } from 'rxjs';

describe('CreateActivityFacadeService', () => {
  let spectator: SpectatorService<CreateActivityFacadeService>;
  const createService = createServiceFactory({
    service: CreateActivityFacadeService,
    imports: [ReactiveFormsModule],
    mocks: [ApiService],
    providers: [
      mockProvider(Router)
    ]
  });

  beforeEach(() => spectator = createService());

  it('should navigate to app when activity created successfully', () => {
    spectator.inject(ApiService).sendCommand.andReturn(of({}));

    spectator.service.form.patchValue({ name: 'test', description: 'test' } as CreateActivityCommand);
    spectator.service.submit();

    expect(spectator.inject(Router).navigate).toHaveBeenCalledWith(['/app']);
  });
});
