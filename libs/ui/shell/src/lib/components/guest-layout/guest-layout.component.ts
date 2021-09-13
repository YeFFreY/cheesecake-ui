import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cc-guest-layout',
  template: `
    <p>
      guest-layout works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestLayoutComponent {
}
