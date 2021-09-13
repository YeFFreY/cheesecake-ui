import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cc-application-layout',
  template: `
    <p>
      application-layout works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationLayoutComponent {
}
