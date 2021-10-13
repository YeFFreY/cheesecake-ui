import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginFacadeService } from './login-facade.service';


@Component({
  selector: 'cc-login',
  template: `

    <div *ngIf='(this.facade.vm$ | async) as vm'>
      <form [formGroup]='facade.form' id='loginForm' (ngSubmit)='facade.submit()' errorTailor>
        <!-- container -->
        <div> <!-- padder -->
          <div> <!-- grid-->
            <div>
              <label for='email'>Email</label>
              <input type='text' id='username' formControlName='username'>
            </div>
            <div>
              <label for='password'>Password</label>
              <input type='password' id='password' formControlName='password'>
            </div>
          </div>
        </div>
        <div>
          <div>{{vm.error?.summary}}</div>
          <div>
            <button type='submit'>Sign in</button>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginFacadeService]
})
export class LoginComponent {

  constructor(public facade: LoginFacadeService) {
  }
}
