import { EditActivityComponent } from './edit-activity.component';
import { createRoutingFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { EditActivityFacadeService } from './edit-activity-facade.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '@cheesecake-ui/core/api';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('EditActivityComponent', () => {
  let spectator: Spectator<EditActivityComponent>;
  const createComponent = createRoutingFactory({
    component: EditActivityComponent,
    imports: [ReactiveFormsModule],
    params: { id: '1' },
    componentProviders: [EditActivityFacadeService],
    providers: [
      mockProvider(ApiService, {
        sendQuery: () => of({ data: { name: 'name', description: 'description' } }),
        sendCommand: () => of( {})
      })
    ]
  });

  beforeEach(async () => spectator = createComponent());

  it('should display activity in the form', () => {
    expect(spectator.query('#name')).toHaveValue('name');
    expect(spectator.query('#description')).toHaveValue('description');
    expect(spectator.query('button[type="submit"]')).toExist();
  });

  it('should navigate to details after successful submit', () => {
    spectator.click('button[type="submit"]');
    expect(spectator.inject(Router).navigate).toHaveBeenCalledTimes(1);
  });

});
