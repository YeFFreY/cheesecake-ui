import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanLoad, CanActivate, CanActivateChild {
  constructor(private readonly sessionService: SessionService, private router: Router) {
  }

  canLoad(): Observable<boolean | UrlTree> {
    return this.allowOrLogin(this.router.getCurrentNavigation()?.extractedUrl.toString());
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.allowOrLogin(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.allowOrLogin(state.url);
  }

  private allowOrLogin(redirectUrl?: string) {
    return this.sessionService.authenticated$.pipe(
      map((authenticated) => authenticated || this.router.createUrlTree(['/login'], { queryParams: { redirect: redirectUrl } }))
    );
  }


}
