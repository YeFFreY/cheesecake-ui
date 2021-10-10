import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, throwError, TimeoutError } from 'rxjs';

export interface AuthenticationError {
  readonly type: 'AuthenticationError';
}

export interface AccessDenied {
  readonly type: 'AccessDenied';
}

export interface ResourceNotFound {
  readonly type: 'ResourceNotFound';
}

export interface NetworkError {
  readonly type: 'NetworkError';
}

export interface InvalidRequest {
  readonly type: 'InvalidRequest',
  errors: unknown //TODO define type for errors
}

export interface UnrecoverableError {
  readonly type: 'UnrecoverableError';
}

export type DataAccessError =
  | AuthenticationError
  | AccessDenied
  | ResourceNotFound
  | InvalidRequest
  | NetworkError
  | UnrecoverableError;

/*
 --- Pattern matching
 --- https://medium.com/@fillopeter/pattern-matching-with-typescript-done-right-94049ddd671c
*/
type DataAccessErrorType = DataAccessError['type'];
type DataAccessErrorMap<U> = {
  [K in DataAccessErrorType]: U extends { type: K } ? U : never
}
type DataAccessErrorTypeMap = DataAccessErrorMap<DataAccessError>
type DataAccessErrorPattern<T> = {
  [K in keyof DataAccessErrorTypeMap]: (error: DataAccessErrorTypeMap[K]) => T
}

export function errorMatcher<T>(pattern: DataAccessErrorPattern<T>): (error: DataAccessError) => T {
  return error => pattern[error.type](error as never);
}

const authenticationError = (): DataAccessError => ({ type: 'AuthenticationError' });
const accessDenied = (): DataAccessError => ({ type: 'AccessDenied' });
const resourceNotFound = (): DataAccessError => ({ type: 'ResourceNotFound' });
const networkError = (): DataAccessError => ({ type: 'NetworkError' });
export const invalidRequest = (response: HttpErrorResponse): DataAccessError => ({
  type: 'InvalidRequest',
  errors: response.error
});
const unRecoverableError = (): DataAccessError => ({ type: 'UnrecoverableError' });

const statusErrorFns: { [key: number]: (response: HttpErrorResponse) => DataAccessError } = {
  401: authenticationError,
  403: accessDenied,
  404: resourceNotFound,
  400: invalidRequest,
  422: invalidRequest,
  500: unRecoverableError
};

export function handleError(errorResponse: HttpErrorResponse): DataAccessError {
  if (errorResponse.error instanceof ErrorEvent || errorResponse.error instanceof TimeoutError) {
    // A client side or network error occurred.
    return networkError();
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contains the error items to give more details about what went wrong.
    const errorFn = statusErrorFns[errorResponse.status] ?? unRecoverableError;
    return errorFn(errorResponse);
  }

}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isError<T>(arg: any, type: string): arg is T {
  return arg.type && arg.type === type;
}

const isInvalidRequest = (arg: unknown): boolean => isError<InvalidRequest>(arg, 'InvalidRequest');
const isAuthenticationError = (arg: unknown): boolean => isError<AuthenticationError>(arg, 'AuthenticationError');

const handleResponseError = (handler: ((arg: unknown) => boolean)) => (callback: (errorData: unknown) => void) => (error: unknown): Observable<never> => {
  if (handler(error)) {
    callback(error);
    return EMPTY;
  } else {
    return throwError(error);
  }
};
export const handleAuthenticationError = handleResponseError(isAuthenticationError);
export const handleInvalidRequest = handleResponseError(isInvalidRequest);
