import {
  CreateCourseActivityCommand,
  CreateCourseActivityFacadeService
} from './create-course-activity-facade.service';
import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '@cheesecake-ui/core/api';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { of } from 'rxjs';

describe('CreateCourseActivityFacadeService', () => {
  let spectator: SpectatorService<CreateCourseActivityFacadeService>;
  const createService = createServiceFactory({
    service: CreateCourseActivityFacadeService,
    imports: [ReactiveFormsModule],
    providers: [
      mockProvider(ApiService, {
        sendQuery: jest.fn(() => of({ data: [{id: '1', name: 'name', description: 'description'}]})),
        sendCommand: jest.fn(() => of( {}))
      })
    ]
  });

  beforeEach(() => spectator = createService());

  it('should inform component when course activity created successfully', () => {
    const submittedSpy = subscribeSpyTo(spectator.service.submitted$);

    spectator.service.updateCriteria('1');
    spectator.service.form.patchValue({ activityId: '1', courseSectionTypeId: '1' } as CreateCourseActivityCommand);
    expect(submittedSpy.getValues()).toEqual([]);

    spectator.service.submit();
    expect(submittedSpy.getValues()).toEqual([undefined]);

  });
});
