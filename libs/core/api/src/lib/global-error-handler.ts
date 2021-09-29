import { ErrorHandler, Injectable, Provider } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    alert('Error from global error handler : ' +  JSON.stringify(error));
  }
}

export const globalErrorHandlerProvider: Provider = {
  provide: ErrorHandler,
  useClass: GlobalErrorHandler
};
