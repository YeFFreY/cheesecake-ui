import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cc-home',
  template: `
    <div>
      <h1>Welcome to CheeseCake !</h1>
      <a routerLink='/login' class='button'>Sign in</a>
      <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolores eligendi et exercitationem, nisi voluptates! Aliquam aperiam at autem culpa dolorum eum hic iste laudantium magnam maxime, minus nulla numquam odio quam, quos ratione rerum, sed temporibus voluptas voluptatem? Ab blanditiis eligendi eos magnam minus nemo nostrum optio, saepe voluptate?</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolores eligendi et exercitationem, nisi voluptates! Aliquam aperiam at autem culpa dolorum eum hic iste laudantium magnam maxime, minus nulla numquam odio quam, quos ratione rerum, sed temporibus voluptas voluptatem? Ab blanditiis eligendi eos magnam minus nemo nostrum optio, saepe voluptate?</p>
      <h3>Lorem ipsum dolor sit amet.</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolores eligendi et exercitationem, nisi voluptates! Aliquam aperiam at autem culpa dolorum eum hic iste laudantium magnam maxime, minus nulla numquam odio quam, quos ratione rerum, sed temporibus voluptas voluptatem? Ab blanditiis eligendi eos magnam minus nemo nostrum optio, saepe voluptate?</p>
      <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, perspiciatis.</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dolores eligendi et exercitationem, nisi voluptates! Aliquam aperiam at autem culpa dolorum eum hic iste laudantium magnam maxime, minus nulla numquam odio quam, quos ratione rerum, sed temporibus voluptas voluptatem? Ab blanditiis eligendi eos magnam minus nemo nostrum optio, saepe voluptate?</p>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
