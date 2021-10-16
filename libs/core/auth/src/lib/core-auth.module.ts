import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sessionInitialize } from './session-initializer.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    sessionInitialize
  ]
})
export class CoreAuthModule {}
