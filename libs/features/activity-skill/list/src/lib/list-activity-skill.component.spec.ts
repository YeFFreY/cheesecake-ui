import { ListActivitySkillComponent } from './list-activity-skill.component';
import { createRoutingFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { ActivitySkill, ListActivitySkillFacadeService } from './list-activity-skill-facade.service';
import { MockComponent } from 'ng-mocks';
import { DeleteActivitySkillComponent } from '@cheesecake-ui/features/activity-skill/delete';
import { SharedComponentsDrawerModule } from '@cheesecake-ui/shared/components/drawer';

describe('ListActivitySkillComponent', () => {
  let spectator: Spectator<ListActivitySkillComponent>;
  const createComponent = createRoutingFactory({
    component: ListActivitySkillComponent,
    imports: [SharedComponentsDrawerModule],
    declarations: [MockComponent(DeleteActivitySkillComponent)],
    params: { id: '1' },
    componentProviders: [
      mockProvider(ListActivitySkillFacadeService, {
        vm$: of({
          skills: [
            { id: '1', name: 'test name' } as ActivitySkill,
            { id: '2', name: 'test name 2' } as ActivitySkill
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

  it('should display activity skills list and add skill button', () => {
    expect(spectator.queryAll('.skill-item')).toHaveLength(2);
    expect(spectator.queryAll('cc-delete-activity-skill')).toHaveLength(2);
    expect(spectator.query('#btn-add-skill')).toHaveText('add skill')
  });
});
