import { CreateActivitySkillComponent } from './create-activity-skill.component';
import { createRoutingFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { CreateActivitySkillFacadeService, Skill } from './create-activity-skill-facade.service';

describe('CreateActivitySkillComponent', () => {
  let spectator: Spectator<CreateActivitySkillComponent>;
  const createComponent = createRoutingFactory({
    component: CreateActivitySkillComponent,
    params: { id: '1' },
    componentProviders: [
      mockProvider(CreateActivitySkillFacadeService, {
        vm$: of({
          skills: [
            { id: '1', name: 'test name', description: 'test description' } as Skill,
            { id: '2', name: 'test name 2', description: 'test description 2' } as Skill
          ]
        }),
        submitted$: of('1')
      })
    ]
  });

  beforeEach(async () => {
    spectator = createComponent()
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display skills list', () => {
    expect(spectator.queryAll('h2')).toHaveLength(2);
    expect(spectator.queryAll('p')).toHaveLength(2);
    expect(spectator.queryAll('button')).toHaveLength(2);
  });

  // todo I should probably also test that the eventEmitter is called when submitted$ gets a next value ?
});
