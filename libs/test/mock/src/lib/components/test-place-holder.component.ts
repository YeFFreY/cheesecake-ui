import { Component } from '@angular/core';

@Component({
  selector: 'test-place-holder',
  template: `
    <p>
      {{message}}
    </p>
  `,
  styles: []
})
export class TestPlaceHolderComponent {
  public message = 'ImaMock';
}
