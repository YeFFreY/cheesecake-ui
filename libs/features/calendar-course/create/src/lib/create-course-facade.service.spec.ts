import { CreateCourseCommand, CreateCourseFacadeService } from './create-course-facade.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '@cheesecake-ui/core/api';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { of } from 'rxjs';

describe('CreateCourseFacadeService', () => {
  let spectator: SpectatorService<CreateCourseFacadeService>;
  const createService = createServiceFactory({
    service: CreateCourseFacadeService,
    imports: [ReactiveFormsModule],
    mocks: [ApiService]
  });

  beforeEach(() => spectator = createService());

  it('should inform component when course created successfully', () => {
    const submittedSpy = subscribeSpyTo(spectator.service.submitted$);

    spectator.inject(ApiService).sendCommand.andReturn(of({}));

    spectator.service.updateCriteria('1');
    spectator.service.form.patchValue({ calendarId: 'test', classId: 'class', start: '01/01/2021', end:'01/01/2021' } as CreateCourseCommand);
    expect(submittedSpy.getValues()).toEqual([]);

    spectator.service.submit();
    expect(submittedSpy.getValues()).toEqual([undefined]);

  });
});
