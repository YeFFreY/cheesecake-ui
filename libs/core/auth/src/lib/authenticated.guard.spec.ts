import { AuthenticatedGuard } from './authenticated.guard';
import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator/jest';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { SessionService } from './session.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

describe('AuthenticatedGuard', () => {
  let spectator: SpectatorService<AuthenticatedGuard>;
  const createGuard = createServiceFactory({
    service: AuthenticatedGuard,
    imports: [RouterTestingModule],
    providers: [
      mockProvider(SessionService, {
        authenticated$: of(false)
      })
    ]
  });

  beforeEach(() => spectator = createGuard());

  it('canLoad should redirect to login when session is not authenticated', () => {
    const canLoad$ = subscribeSpyTo(spectator.service.canLoad());

    expect(canLoad$.getValues().map((urlTree: UrlTree) => urlTree.toString())).toEqual(['/login']);
  });

  it('canLoad should load module when session is authenticated', () => {
    const session = spectator.inject<SessionService>(SessionService);
    session.authenticated$ = of(true);
    const canLoad$ = subscribeSpyTo(spectator.service.canLoad());

    expect(canLoad$.getValues()).toEqual([true]);
  });

  it('canActivate should redirect to login (with the redirect in URL) when session is not authenticated', () => {
    const canActivate$ = subscribeSpyTo(spectator.service.canActivate({} as ActivatedRouteSnapshot, { url: '/app' } as RouterStateSnapshot));

    expect(canActivate$.getValues().map((urlTree: UrlTree) => urlTree.toString())).toEqual(['/login?redirect=%2Fapp']);
  });

  it('canActivate should allow navigation when session is authenticated', () => {
    const session = spectator.inject<SessionService>(SessionService);
    session.authenticated$ = of(true);
    const canActivate$ = subscribeSpyTo(spectator.service.canActivate({} as ActivatedRouteSnapshot, { url: '/app' } as RouterStateSnapshot));

    expect(canActivate$.getValues()).toEqual([true]);
  });

});
