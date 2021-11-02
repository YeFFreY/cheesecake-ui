import { Injectable, Provider } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { EMPTY, Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeoutWith } from 'rxjs/operators';
import { errorMatcher, handleError } from './api.errors';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      timeoutWith(60000, throwError(new HttpErrorResponse({ error: new TimeoutError(), url: request.url }))),
      catchError((error: HttpErrorResponse) => handlers(handleError(error)))
    );
  }
}

const handlers = errorMatcher<Observable<never>>({
  InvalidRequest: error => throwError(error),
  AuthenticationError: error => throwError(error),
  NetworkError: error => {
    console.log(`Network issue ? ${error.type}`);
    return EMPTY;
  },
  UnrecoverableError: error => {
    console.log(`UnrecoverableError issue ?? ${error.type}`);
    return EMPTY;
  },
  AccessDenied: error => {
    console.log(`AccessDenied issue ? ${error.type}`);
    return EMPTY;
  },
  ResourceNotFound: error => {
    console.log('ResourceNotFound',error);
    return EMPTY;
  }
});

export const errorInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ApiErrorInterceptor,
  multi: true
};
