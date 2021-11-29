import { ListCourseActivityComponent } from './list-course-activity.component';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { SharedComponentsDrawerModule } from '@cheesecake-ui/shared/components/drawer';
import { of } from 'rxjs';
import { CourseActivity, ListCourseActivityFacadeService, Section } from './list-course-activity-facade.service';
import { MockComponent } from 'ng-mocks';
import { DeleteCourseActivityComponent } from '@cheesecake-ui/features/course-activity/delete';

describe('ListCourseActivityComponent', () => {
  let spectator: Spectator<ListCourseActivityComponent>;
  const createComponent = createComponentFactory({
    component: ListCourseActivityComponent,
    imports: [SharedComponentsDrawerModule],
    declarations: [MockComponent(DeleteCourseActivityComponent)],
    componentProviders: [
      mockProvider(ListCourseActivityFacadeService, {
        vm$: of({
          sections: [
            {
              sectionDescription: 'desc1',
              sectionTypeId: '1',
              activities: [{ activityId: '1', activityName: 'act1' } as CourseActivity]
            } as Section,
            {
              sectionDescription: 'desc2', sectionTypeId: '2', activities: [
                { activityId: '2', activityName: 'act2' } as CourseActivity,
                { activityId: '3', activityName: 'act3' } as CourseActivity
              ]
            } as Section
          ]
        })
      })
    ]
  });

  beforeEach(async () => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display course activities list and add activity button', () => {
    expect(spectator.queryAll('.section-item')).toHaveLength(2);
    expect(spectator.queryAll('.activity-item')).toHaveLength(3);
    expect(spectator.queryAll('cc-delete-course-activity')).toHaveLength(3);
    expect(spectator.query('#btn-add-activity')).toHaveText('Add activity');
  });
});
