import { Injectable, Provider } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { SessionService } from './session.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401){
          const requiresRedirect = !['/auth/session', 'auth/login'].includes(request.url)
          this.sessionService.signedOut(requiresRedirect)
          // if redirection to login is required, we don't send the error the the original caller
          return requiresRedirect ? EMPTY : throwError(error);
        }
        return throwError(error)
      })
    );
  }
}


export const sessionInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: SessionInterceptor,
  multi: true,
};
