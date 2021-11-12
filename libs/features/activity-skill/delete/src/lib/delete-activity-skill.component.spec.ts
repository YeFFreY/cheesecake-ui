import { DeleteActivitySkillComponent } from './delete-activity-skill.component';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { DeleteActivitySkillFacadeService } from './delete-activity-skill-facade.service';
import { of } from 'rxjs';

describe('DeleteActivitySkillComponent', () => {
  let spectator: Spectator<DeleteActivitySkillComponent>;
  const createComponent = createComponentFactory({
    component: DeleteActivitySkillComponent,
    componentProviders: [
      mockProvider(DeleteActivitySkillFacadeService, {
        submitted$: of(),
        updateCriteria: jest.fn()
      })
    ]
  });

  beforeEach(() => spectator = createComponent({
    props: {
      activityId: '1',
      skillId: '1'
    }
  }));

  it('should display the delete button', () => {
    expect(spectator.component).toBeTruthy();
    expect(spectator.query('button')).toHaveText('delete');
  });
});
