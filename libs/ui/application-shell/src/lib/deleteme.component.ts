import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cc-deleteme',
  template: `
    <div>
      <p>deleteme</p>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeletemeComponent {

}
