import { DetailsCourseComponent } from './details-course.component';
import { createRoutingFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { DetailsCourseFacadeService } from './details-course-facade.service';
import { of } from 'rxjs';

describe('DetailsCourseComponent', () => {
  let spectator: Spectator<DetailsCourseComponent>;
  const createComponent = createRoutingFactory({
    component: DetailsCourseComponent,
    params: { calendarId: '1' },
    componentProviders: [
      mockProvider(DetailsCourseFacadeService, {
        vm$: of({ course: { classOverview: {id: '1', name: 'class'}, start: '01/01/2021', end: '01/01/2021' } })
      })
    ]
  });

  beforeEach(async () => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display calendar details', () => {
    expect(spectator.query('.course-timestamp')).not.toBeNull();
    expect(spectator.query('h2')).toHaveText('class');
  });
});
