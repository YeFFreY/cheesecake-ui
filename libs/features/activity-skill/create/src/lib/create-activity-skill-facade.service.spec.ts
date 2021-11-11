import { CreateActivitySkillFacadeService } from './create-activity-skill-facade.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '@cheesecake-ui/core/api';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { of } from 'rxjs';

describe('CreateActivitySkillFacadeService', () => {
  let spectator: SpectatorService<CreateActivitySkillFacadeService>;
  const createService = createServiceFactory({
    service: CreateActivitySkillFacadeService,
    imports: [ReactiveFormsModule],
    mocks: [ApiService]
  });

  beforeEach(() => spectator = createService());

  it('should be created and give no available skills until id of activity given', () => {
    const vmSpy = subscribeSpyTo(spectator.service.vm$);
    expect(vmSpy.getValues()).toEqual([{ skills: [] }]);
    expect(spectator.inject(ApiService).sendQuery).not.toBeCalled();
  });

  it('should fetch available skills when id given', () => {
    const vmSpy = subscribeSpyTo(spectator.service.vm$);
    spectator.inject(ApiService).sendQuery.andReturn(of({ data: [{}] }));

    spectator.service.updateCriteria('1');

    expect(spectator.inject(ApiService).sendQuery).toHaveBeenCalledTimes(1);
    expect(vmSpy.getValues()).toEqual([{ skills: [] }, { skills: [{}] }]);
  });

  it('should inform component when skill associated to activity successfully', () => {
    const submittedSpy = subscribeSpyTo(spectator.service.submitted$);
    spectator.inject(ApiService).sendCommand.andReturn(of({}));

    spectator.service.updateCriteria('1');
    expect(submittedSpy.getValues()).toEqual([]);

    spectator.service.selectSkill('2')
    expect(submittedSpy.getValues()).toEqual([undefined]);

  });

  it('should NOT submit data when select button called without having first having activity id', () => {
    const submittedSpy = subscribeSpyTo(spectator.service.submitted$);
    spectator.inject(ApiService).sendCommand.andReturn(of({}));

    // we do not set the activityId with 'updateCriteria'
    expect(submittedSpy.getValues()).toEqual([]);

    spectator.service.selectSkill('2')
    expect(submittedSpy.getValues()).toEqual([]);
  });
});
