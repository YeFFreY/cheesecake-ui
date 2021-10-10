import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoginFormService } from './login-form.service';
import { LoginFacadeService } from './login-facade.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'cc-login',
  template: `

    <div *ngIf='(this.facade.vm$ | async) as vm'>
      <form [formGroup]='formService.form' id='loginForm' (ngSubmit)='facade.submit()'> <!-- container -->
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
          <button type='submit'>Sign in</button>
        </div>
        <pre>{{vm | json}}</pre>
      </form>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginFormService]
})
export class LoginComponent implements OnInit {

  constructor(public formService: LoginFormService, public facade: LoginFacadeService) {
  }

  ngOnInit(): void {
    this.formService.validValue$
      .pipe(untilDestroyed(this))
      .subscribe(value => this.facade.updateCredentials(value));
  }

}
