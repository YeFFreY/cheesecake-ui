import { DeleteActivityMaterialsComponent } from './delete-activity-materials.component';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { DeleteActivityMaterialsFacadeService } from './delete-activity-materials-facade.service';

describe('DeleteActivityMaterialsComponent', () => {
  let spectator: Spectator<DeleteActivityMaterialsComponent>;
  const createComponent = createComponentFactory({
    component: DeleteActivityMaterialsComponent,
    componentProviders: [
      mockProvider(DeleteActivityMaterialsFacadeService, {
        submitted$: of(),
        updateCriteria: jest.fn()
      })
    ]
  });

  beforeEach(() => spectator = createComponent({
    props: {
      activityId: '1',
      equipmentId: '1'
    }
  }));

  it('should display the delete button', () => {
    expect(spectator.component).toBeTruthy();
    expect(spectator.query('button')).toHaveText('delete');
  });
});
