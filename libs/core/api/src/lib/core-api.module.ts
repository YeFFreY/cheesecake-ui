import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { errorInterceptorProvider } from './api-error.interceptor';
import { globalErrorHandlerProvider } from './global-error-handler';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    globalErrorHandlerProvider,
    errorInterceptorProvider
  ],

})
export class CoreApiModule {}
