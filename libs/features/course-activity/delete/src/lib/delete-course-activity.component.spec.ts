import { DeleteCourseActivityComponent } from './delete-course-activity.component';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { DeleteCourseActivityFacadeService } from './delete-course-activity-facade.service';

describe('DeleteCourseActivityComponent', () => {
  let spectator: Spectator<DeleteCourseActivityComponent>;
  const createComponent = createComponentFactory({
    component: DeleteCourseActivityComponent,
    componentProviders: [
      mockProvider(DeleteCourseActivityFacadeService, {
        submitted$: of(),
        updateCriteria: jest.fn()
      })
    ]
  });

  beforeEach(() => spectator = createComponent({
    props: {
      activityId: '1',
      courseId: '1',
      sectionTypeId: 'COOL_DOWN'
    }
  }));

  it('should display the delete button', () => {
    expect(spectator.component).toBeTruthy();
    expect(spectator.query('button')).toHaveText('delete');
  });
});
