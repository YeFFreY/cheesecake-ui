import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cc-home',
  template: `
    <div>
      <h1>Welcome to CheeseCake !</h1>
      <p>Sign in / Sign up</p>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
