import { CreateActivityMaterialsComponent } from './create-activity-materials.component';
import { createRoutingFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { CreateActivityMaterialsFacadeService, Equipment } from './create-activity-materials-facade.service';

describe('CreateActivityMaterialsComponent', () => {
  let spectator: Spectator<CreateActivityMaterialsComponent>;
  const createComponent = createRoutingFactory({
    component: CreateActivityMaterialsComponent,
    params: { id: '1' },
    componentProviders: [
      mockProvider(CreateActivityMaterialsFacadeService, {
        vm$: of({
          equipments: [
            { id: '1', name: 'test name', description: 'test description' } as Equipment,
            { id: '2', name: 'test name 2', description: 'test description 2' } as Equipment
          ]
        }),
        submitted$: of('1')
      })
    ]
  });

  beforeEach(async () => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display equipments list', () => {
    expect(spectator.queryAll('h2')).toHaveLength(2);
    expect(spectator.queryAll('p')).toHaveLength(2);
    expect(spectator.queryAll('button')).toHaveLength(2);
  });

  // todo I should probably also test that the eventEmitter is called when submitted$ gets a next value ?
});
