import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

import { LoginFacadeService } from './login-facade.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthStateService } from '@cheesecake-ui/core-auth';


describe('LoginFacadeService', () => {
  let service: LoginFacadeService;
  let authState: AuthStateService;
  let http: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LoginFacadeService,
        AuthStateService
      ]
    });
    service = TestBed.inject(LoginFacadeService);
    http = TestBed.inject(HttpTestingController);
    authState = TestBed.inject(AuthStateService);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should mark as authenticated when credentials received and submitted', () => {
    const signedInFn = jest.spyOn(authState, 'signedIn');
    const vmSpy = subscribeSpyTo(service.vm$);

    service.updateCredentials({ email: 'a.b@c.d', password: 'password'});
    service.submit();

    http.expectOne('https://reqres.in/api/login').flush({});

    expect(vmSpy.getValues()).toEqual([{ authenticated: false }, { authenticated: true }]);
    expect(signedInFn).toHaveBeenCalledTimes(1);
  });
});
