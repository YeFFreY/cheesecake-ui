import { CreateActivityOperationComponent } from './create-activity-operation.component';
import { createRoutingFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { CreateActivityOperationFacadeService } from './create-activity-operation-facade.service';
import { ApiService } from '@cheesecake-ui/core/api';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsSelectorModule } from '@cheesecake-ui/shared/components/selector';

describe('CreateActivityOperationComponent', () => {
  let spectator: Spectator<CreateActivityOperationComponent>;
  const createComponent = createRoutingFactory({
    component: CreateActivityOperationComponent,
    imports: [ReactiveFormsModule, SharedComponentsSelectorModule],
    params: { id: '1' },
    componentProviders: [CreateActivityOperationFacadeService],
    providers: [
      mockProvider(ApiService, {
        sendQuery: jest.fn(() => of({ data: [{id: '1', description : 'desc 1'}]})),
        sendCommand: jest.fn(() => of( {}))
      })
    ]
  });

  beforeEach(async () => {
    spectator = createComponent()
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display form to create operation', () => {
    expect(spectator.query('#type')).toHaveValue('');
    expect(spectator.query('#description')).toHaveValue('');
    expect(spectator.query('button[type="submit"]')).toExist();
  });


  it('should navigate to details after successful submit', () => {
    spectator.click('#type button');
    const operationTypes = spectator.queryAll('.selector-item');
    spectator.click(operationTypes.pop());
    spectator.typeInElement('some description','#description');
    spectator.click('button[type="submit"]');
    expect(spectator.inject(Router).navigate).toHaveBeenCalledTimes(1);
  });
});
