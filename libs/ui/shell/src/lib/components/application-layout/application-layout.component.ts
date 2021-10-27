import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cc-application-layout',
  template: `
    <cc-header></cc-header>
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    :host {
      display : grid;
      grid-template-rows: max-content 1fr;
      height  : 100%;
    }

    div {
      width: 100%;
      overflow-y: auto;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationLayoutComponent {
}
