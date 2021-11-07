import { DrawerComponent } from './drawer.component';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';

describe('DrawerComponent', () => {
  let spectator: SpectatorHost<DrawerComponent>;
  const createComponent = createHostFactory(DrawerComponent);

  beforeEach(async () => spectator = createComponent(`
  <cc-drawer [isOpen]='open' (drawerClosed)='open = false'>
      <ng-template ccDrawerHeader>
        <h1>test</h1>
      </ng-template>
      <ng-template ccDrawerBody>
        <p>test</p>
      </ng-template>
    </cc-drawer>
  `, {
    hostProps: {
      isOpen: false
    }
  }));

  it('should create and be closed by default', () => {
    expect(spectator.component).toBeTruthy();
    expect(spectator.component.isOpen).toBeFalsy();
    expect(spectator.query('h1')).toBeNull();
    expect(spectator.query('p')).toBeNull();
  });

  it('should open and display content', () => {
    spectator.component.isOpen = true;
    expect(spectator.query('.overlay.is-open')).toBeDefined();
    expect(spectator.query('.wrapper.is-open')).toBeDefined();
    expect(spectator.query('h1')).toBeDefined();
    expect(spectator.query('p')).toBeDefined();
  });

});
