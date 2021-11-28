import { CourseActivity, ListCourseActivityFacadeService } from './list-course-activity-facade.service';
import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator/jest';
import { ApiService } from '@cheesecake-ui/core/api';
import { of } from 'rxjs';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('ListCourseActivityFacadeService', () => {
  let spectator: SpectatorService<ListCourseActivityFacadeService>;
  const createService = createServiceFactory({
    service: ListCourseActivityFacadeService,
    providers: [
      mockProvider(ApiService, {
        sendQuery: () => of({
          data: [{
            activityId: '1',
            activityName: 'activity 1',
            sectionTypeId: '1',
            sectionDescription: 'section 1'
          } as CourseActivity]
        })
      })
    ]
  });

  beforeEach(() => spectator = createService());

  it('should be created and give no activities until id of course given', () => {
    const vmSpy = subscribeSpyTo(spectator.service.vm$);
    expect(vmSpy.getValues()).toEqual([]);
  });

  it('should fetch activities when id given', () => {
    const vmSpy = subscribeSpyTo(spectator.service.vm$);

    spectator.service.updateCriteria('1');

    expect(vmSpy.getValues()).toEqual([{
      sections: [{
        activities: [
          {
            activityId: '1',
            activityName: 'activity 1',
            sectionDescription: 'section 1',
            sectionTypeId: '1'
          }
        ],
        sectionDescription: 'section 1',
        sectionTypeId: '1'
      }]
    }]);
  });
});
