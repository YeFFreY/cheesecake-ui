import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFacadeService } from './login-facade.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const facade = { submit: jest.fn(), updateCredentials: jest.fn(), vm$: of({ authenticated: true }) };
  const router = { navigate: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: LoginFacadeService, useValue: facade },
        { provide: Router, useValue: router }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the form to login', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#username')).toBeTruthy();
    expect(compiled.querySelector('#password')).toBeTruthy();
    expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
  });

  it('should wire the form data to the facade', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const usernameInput = compiled.querySelector('#username') as HTMLInputElement;
    usernameInput.value = 'a.b@c.b';
    usernameInput.dispatchEvent(new Event('input'));

    const passwordInput = compiled.querySelector('#password') as HTMLInputElement;
    passwordInput.value = 'password';
    passwordInput.dispatchEvent(new Event('input'));

    (compiled.querySelector('button[type="submit"]') as HTMLElement).click();
    fixture.detectChanges()

    expect(facade.submit).toHaveBeenCalledTimes(1);
    expect(facade.updateCredentials).toHaveBeenCalledWith({"username": "a.b@c.b", "password": "password"});

  })
});
