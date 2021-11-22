import { CreateCourseComponent } from './create-course.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '@cheesecake-ui/core/api';
import { CreateCourseFacadeService } from './create-course-facade.service';
import { SharedComponentsSelectorModule } from '@cheesecake-ui/shared/components/selector';

describe('CreateCourseComponent', () => {
  let spectator: Spectator<CreateCourseComponent>;
  const createComponent = createComponentFactory({
    component: CreateCourseComponent,
    imports:[ReactiveFormsModule, RouterTestingModule, SharedComponentsSelectorModule],
    componentProviders:[CreateCourseFacadeService],
    mocks:[ApiService]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.query('#classId')).toHaveValue('');
    expect(spectator.query('#start')).toHaveValue('');
    expect(spectator.query('#end')).toHaveValue('');
    expect(spectator.query('button[type="submit"]')).toExist();
  });
});
