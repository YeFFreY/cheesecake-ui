import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginFacadeService } from './login-facade.service';


@Component({
  selector: 'cc-login',
  template: `
    <div *ngIf='(this.facade.vm$ | async) as vm'>
      <form [formGroup]='facade.form' id='loginForm' (ngSubmit)='facade.submit()' errorTailor>
        <section>{{vm.error?.summary}}</section>
        <section>
          <div class='form-grid'>
            <div class='form-element'>
              <label for='email'>Email</label>
              <input type='text' id='username' formControlName='username' class='input'>
            </div>
            <div class='form-element'>
              <label for='password'>Password</label>
              <input type='password' id='password' formControlName='password' class='input'>
            </div>
          </div>
        </section>
        <section class='form-footer'>
          <button type='submit' class='button'>Sign in</button>
        </section>
      </form>
    </div>
  `,
  styles: [`
    :host {
      align-self: center;
      justify-self: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginFacadeService]
})
export class LoginComponent {

  constructor(public facade: LoginFacadeService) {
  }
}
