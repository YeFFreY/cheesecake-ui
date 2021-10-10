import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderFacadeService } from './header-facade.service';

@Component({
  selector: 'cc-header',
  template: `
    <div>
      <span>header works!</span>
      <div *ngIf='facade.authenticated$ | async; else loginBlock'>
        <button (click)='facade.logout()'>Logout</button>
      </div>
    </div>
    <ng-template #loginBlock>
      <div>
        <a id='link-login' routerLink='/login'>Login</a>
      </div>
    </ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[HeaderFacadeService]
})
export class HeaderComponent {
  constructor(public readonly facade: HeaderFacadeService) {
  }
}
