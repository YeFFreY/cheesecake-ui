import { ListActivityOperationComponent } from './list-activity-operation.component';
import { createRoutingFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { ActivityOperation, ListActivityOperationFacadeService } from './list-activity-operation-facade.service';

describe('ListActivityOperationComponent', () => {
  let spectator: Spectator<ListActivityOperationComponent>;
  const createComponent = createRoutingFactory({
    component: ListActivityOperationComponent,
    params: { id: '1' },
    componentProviders: [
      mockProvider(ListActivityOperationFacadeService, {
        vm$: of({
          operations: [
            { typeId: 'CORE', typeDescription: 'Core of the activity', description: 'abcd' } as ActivityOperation,
            { typeId: 'SETUP', typeDescription: 'Setup of the activity', description: 'abcd' } as ActivityOperation
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

  it('should display activity operations list ', () => {
    expect(spectator.queryAll('.operation-item')).toHaveLength(2);
  });
});
