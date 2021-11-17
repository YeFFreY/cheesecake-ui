import { CreateActivityVariantComponent } from './create-activity-variant.component';
import { createRoutingFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '@cheesecake-ui/core/api';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CreateActivityVariantFacadeService } from './create-activity-variant-facade.service';

describe('CreateActivityVariantComponent', () => {
  let spectator: Spectator<CreateActivityVariantComponent>;
  const createComponent = createRoutingFactory({
    component: CreateActivityVariantComponent,
    imports: [ReactiveFormsModule],
    params: { id: '1' },
    componentProviders: [CreateActivityVariantFacadeService],
    providers: [
      mockProvider(ApiService, {
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

  it('should display form to create variant', () => {
    expect(spectator.query('#name')).toHaveValue('');
    expect(spectator.query('#description')).toHaveValue('');
    expect(spectator.query('button[type="submit"]')).toExist();
  });


  it('should navigate to details after successful submit', () => {
    spectator.typeInElement('some name','#name');
    spectator.typeInElement('some description','#description');
    spectator.click('button[type="submit"]');
    expect(spectator.inject(Router).navigate).toHaveBeenCalledTimes(1);
  });
});
