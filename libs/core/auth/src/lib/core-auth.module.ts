import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sessionInitializerProvider } from './session-initializer.service';
import { sessionInterceptorProvider } from './session.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [
    sessionInitializerProvider,
    sessionInterceptorProvider
  ]
})
export class CoreAuthModule {}
