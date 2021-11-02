import { DetailsActivityComponent } from './details-activity.component';
import { createRoutingFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { DetailsActivityFacadeService } from './details-activity-facade.service';

describe('DetailsActivityComponent', () => {
  let spectator: Spectator<DetailsActivityComponent>;
  const createComponent = createRoutingFactory({
    component: DetailsActivityComponent,
    params: { i: '1'},
    componentProviders: [
      mockProvider(DetailsActivityFacadeService, {
        vm$: of({ activity: { name: "test name", description: "test description"} })
      })
    ]
  });

  beforeEach(async () => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display activity details', () => {
    expect(spectator.query('h2')).toHaveText('test name');
    expect(spectator.query('p')).toHaveText('test description');
  });
});