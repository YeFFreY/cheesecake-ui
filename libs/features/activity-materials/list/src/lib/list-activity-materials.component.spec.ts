import { ListActivityMaterialsComponent } from './list-activity-materials.component';
import { createRoutingFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { SharedComponentsDrawerModule } from '@cheesecake-ui/shared/components/drawer';
import { of } from 'rxjs';
import { ActivityMaterials, ListActivityMaterialsFacadeService } from './list-activity-materials-facade.service';

describe('ListActivityMaterialsComponent', () => {
  let spectator: Spectator<ListActivityMaterialsComponent>;
  const createComponent = createRoutingFactory({
    component: ListActivityMaterialsComponent,
    imports: [SharedComponentsDrawerModule],
    params: { id: '1' },
    componentProviders: [
      mockProvider(ListActivityMaterialsFacadeService, {
        vm$: of({
          materials: [
            { id: '1', name: 'test name' } as ActivityMaterials,
            { id: '2', name: 'test name 2' } as ActivityMaterials
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

  it('should display activity materials list and add material button', () => {
    expect(spectator.queryAll('.materials-item')).toHaveLength(2);
    expect(spectator.query('#btn-add-materials')).toHaveText('add materials');
  });
});
