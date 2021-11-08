import { CreateSkillComponent } from './create-skill.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '@cheesecake-ui/core/api';
import { CreateSkillFacadeService } from './create-skill-facade.service';

describe('CreateSkillComponent', () => {
  let spectator: Spectator<CreateSkillComponent>;
  const createComponent = createComponentFactory({
    component: CreateSkillComponent,
    imports:[ReactiveFormsModule, RouterTestingModule],
    componentProviders:[CreateSkillFacadeService],
    mocks:[ApiService]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.query('#name')).toHaveValue('');
    expect(spectator.query('#description')).toHaveValue('');
    expect(spectator.query('button[type="submit"]')).toExist();
  });
});
