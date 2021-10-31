import { ListActivityComponent } from './list-activity.component';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { ListActivityFacadeService } from './list-activity-facade.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListActivityComponent', () => {
  let spectator: Spectator<ListActivityComponent>;
  const createComponent = createComponentFactory({
    component: ListActivityComponent,
    imports: [RouterTestingModule],
    componentProviders: [
      mockProvider(ListActivityFacadeService, {
        vm$: of({ activities: [{ name: "test", description: "test"}] })
      })
    ]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.query('h1')).toHaveText('Activities');
    expect(spectator.query('.activities')?.children.length).toEqual(1);
    expect(spectator.queryAll('.activities > div > h2')).toHaveText(["test"])
  });
});
