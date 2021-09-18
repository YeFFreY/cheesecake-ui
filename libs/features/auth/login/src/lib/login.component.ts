import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoginFormService } from './login-form.service';
import { LoginFacadeService } from './login-facade.service';
import { of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'cc-login',
  template: `

    <div *ngIf='(vm$ | async) as vm'>
      <form [formGroup]='formService.form' id='loginForm' (ngSubmit)='facade.submit()'> <!-- container -->
        <div> <!-- padder -->
          <div> <!-- grid-->
            <div>
              <label for='email'>Email</label>
              <input type='text' id='email' formControlName='email'>
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
  vm$ = this.facade.vm$;

  constructor(public formService: LoginFormService, public facade: LoginFacadeService, private router: Router) {
    this.vm$.pipe(
      map(vm => vm.authenticated),
      filter(authenticated => authenticated),
      untilDestroyed(this)
    ).subscribe(() => router.navigate(['/']));
  }

  ngOnInit(): void {
    this.formService.value$
      .pipe(untilDestroyed(this))
      .subscribe(value => this.facade.updateCredentials(value));

    of({ email: 'eve.holt@reqres.in', password: 'cityslicka' })
      .subscribe(value => this.formService.patch(value));
  }

}
