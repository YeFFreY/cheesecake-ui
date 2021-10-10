import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cc-application-layout',
  template: `
    <cc-header></cc-header>
    <h1>Application Layout</h1>
    <router-outlet></router-outlet>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationLayoutComponent {
}
