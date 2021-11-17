import { ListActivityVariantComponent } from './list-activity-variant.component';
import { createRoutingFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { ActivityVariant, ListActivityVariantFacadeService } from './list-activity-variant-facade.service';

describe('ListActivityVariantComponent', () => {
  let spectator: Spectator<ListActivityVariantComponent>;
  const createComponent = createRoutingFactory({
    component: ListActivityVariantComponent,
    params: { id: '1' },
    componentProviders: [
      mockProvider(ListActivityVariantFacadeService, {
        vm$: of({
          variants: [
            { name: 'More difficult', description: 'abcd' } as ActivityVariant,
            { name: 'Less difficult', description: 'abcd' } as ActivityVariant
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

  it('should display activity variants list ', () => {
    expect(spectator.queryAll('.variant-item')).toHaveLength(2);
  });
});
