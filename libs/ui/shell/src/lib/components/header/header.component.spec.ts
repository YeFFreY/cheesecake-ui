import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderFacadeService } from './header-facade.service';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const facade = { logout: jest.fn(), authenticated$: of(false) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent]
    });
    await TestBed.overrideComponent(HeaderComponent, {
      set: {
        providers: [
          { provide: HeaderFacadeService, useValue: facade }
        ]
      }
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the login link when not authenticated', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#link-login')).toBeTruthy();
  });

  it('should display the logout button when authenticated', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    facade.authenticated$ = of(true);
    fixture.detectChanges();
    expect(compiled.querySelector('#link-login')).toBeTruthy();
  });

});
