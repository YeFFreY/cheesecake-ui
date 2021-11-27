import { CreateCourseActivityComponent } from './create-course-activity.component';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsSelectorModule } from '@cheesecake-ui/shared/components/selector';
import { ApiService } from '@cheesecake-ui/core/api';
import { of } from 'rxjs';
import { CreateCourseActivityFacadeService } from './create-course-activity-facade.service';

describe('CreateCourseActivityComponent', () => {
  let spectator: Spectator<CreateCourseActivityComponent>;
  const createComponent = createComponentFactory({
    component: CreateCourseActivityComponent,
    imports: [ReactiveFormsModule, SharedComponentsSelectorModule],
    componentProviders: [CreateCourseActivityFacadeService],
    providers: [
      mockProvider(ApiService, {
        sendQuery: jest.fn(() => of({ data: [{id: '1', name: 'name', description: 'description'}]})),
        sendCommand: jest.fn(() => of( {}))
      })
    ]
  });

  beforeEach(async () => {
    spectator = createComponent()
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display form to create operation', () => {
    spectator.setInput('courseId', '1');
    expect(spectator.query('#courseSectionTypeId')).toHaveValue('');
    expect(spectator.query('#activityId')).toHaveValue('');
    expect(spectator.query('button[type="submit"]')).toExist();
  });


  it('should navigate to details after successful submit', () => {

    let activityAdded = false;
    spectator.output('activityAdded').subscribe(() => activityAdded = true)

    spectator.setInput('courseId', '1');

    spectator.click('#courseSectionTypeId button');
    const selectionTypes = spectator.queryAll('.selector-item');
    expect(selectionTypes.length).toEqual(1);
    spectator.click(selectionTypes.pop());

    spectator.click('#activityId button');
    const activities = spectator.queryAll('.selector-item');
    expect(activities.length).toEqual(1);
    spectator.click(activities.pop());

    spectator.click('button[type="submit"]');

    expect(activityAdded).toBeTruthy();

  });
});
