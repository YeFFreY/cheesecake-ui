import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cc-guest-layout',
  template: `
    <h1>Guest Layout</h1>
    <router-outlet></router-outlet>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestLayoutComponent {
}
