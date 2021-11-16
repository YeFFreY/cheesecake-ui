import { SelectorComponent } from './selector.component';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { UtilsFormModule } from '@cheesecake-ui/utils/form';
import { SharedComponentsDrawerModule } from '@cheesecake-ui/shared/components/drawer';

describe('SelectorComponent', () => {
  let spectator: SpectatorHost<SelectorComponent>;
  const createComponent = createHostFactory({
    component: SelectorComponent,
    imports: [UtilsFormModule, SharedComponentsDrawerModule]
  });

  beforeEach(async () => spectator = createComponent(`
  <cc-selector [options]='options'></cc-selector>
  `, {
    hostProps: {
      options: [
        { id: '1', description: 'desc1' },
        { id: '2', description: 'desc2' }
      ]
    }
  }));

  it('should create and be closed by default', () => {
    expect(spectator.component).toBeTruthy();
    expect(spectator.query('.overlay.is-open')).toBeNull();
    expect(spectator.query('.wrapper.is-open')).toBeNull();
    expect(spectator.query('h3')).toBeNull();
    expect(spectator.queryAll('.selector-item')).toHaveLength(0);

  });

  it('should open and display content', () => {
    spectator.click('button');
    expect(spectator.query('.overlay.is-open')).not.toBeNull();
    expect(spectator.query('.wrapper.is-open')).not.toBeNull();
    expect(spectator.query('h3')).not.toBeNull();
    expect(spectator.queryAll('.selector-item')).toHaveLength(2);
  });
});
