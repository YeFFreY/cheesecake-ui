import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderFacadeService } from './header-facade.service';

@Component({
  selector: 'cc-header',
  template: `
    <div class='brand'><a routerLink='/'>Cheesecake</a></div>
    <div>
      <ul *ngIf='facade.authenticated$ | async' class='navigation'>
        <li><a routerLink='/app/activities' routerLinkActive='active'>Portfolio</a></li>
        <li><a routerLink='/app/calendars/new' routerLinkActive='active'>Calendars</a></li>
        <li><a routerLink='/app/classes/new' routerLinkActive='active'>Schools</a></li>
      </ul>
    </div>
    <div class='profile'>
      <ng-container *ngIf='facade.authenticated$ | async; else loginBlock'>
        <a (click)='facade.logout()' class='unstyled'>Logout</a>
      </ng-container>
    </div>
    <ng-template #loginBlock>
      <a id='link-login' routerLink='/login' class='unstyled'>Login</a>
    </ng-template>
  `,
  styles: [`
    :host {
      display               : grid;
      grid-template-columns : max-content 1fr max-content;
      grid-gap              : var(--space-lg);
      padding               : 0 var(--space-md);
      align-items           : center;
      background-color      : var(--color-header-primary-bg);
      border-bottom         : 5px solid var(--color-border);
      box-shadow            : var(--shadow-500);
    }

    .brand > a {
      color           : var(--color-header-secondary-label);
      text-decoration : none;
      font-size       : var(--text-xl);
      font-weight     : var(--font-weight-bold);
    }

    .navigation {
      list-style : none;
      display    : flex;
      grid-gap   : var(--space-sm);
    }

    .navigation > li > a {
      border-bottom   : 5px solid transparent;
      color           : var(--color-header-primary-label);
      display         : inline-block;
      font-size       : var(--text-xl);
      font-weight     : var(--font-weight-light);
      text-decoration : none;
      padding         : var(--space-xs) var(--space-sm);
    }

    .profile > a {
      color : var(--color-header-secondary-label);
    }

  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HeaderFacadeService]
})
export class HeaderComponent {
  constructor(public readonly facade: HeaderFacadeService) {
  }
}
