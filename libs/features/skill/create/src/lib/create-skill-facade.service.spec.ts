import { CreateSkillCommand, CreateSkillFacadeService } from './create-skill-facade.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '@cheesecake-ui/core/api';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { of } from 'rxjs';

describe('CreateSkillFacadeService', () => {
  let spectator: SpectatorService<CreateSkillFacadeService>;
  const createService = createServiceFactory({
    service: CreateSkillFacadeService,
    imports: [ReactiveFormsModule],
    mocks: [ApiService]
  });

  beforeEach(() => spectator = createService());

  it('should inform component when skill created successfully', () => {
    const submittedSpy = subscribeSpyTo(spectator.service.submitted$);

    spectator.inject(ApiService).sendCommand.andReturn(of({}));
    spectator.service.form.patchValue({ name: 'test', description: 'test' } as CreateSkillCommand);
    expect(submittedSpy.getValues()).toEqual([]);

    spectator.service.submit();
    expect(submittedSpy.getValues()).toEqual([undefined]);

  });
});
