import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UiShellModule } from '@cheesecake-ui/ui/shell';
import { CoreAuthModule } from '@cheesecake-ui/core-auth';
import { CoreApiModule } from '@cheesecake-ui/core/api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreApiModule, CoreAuthModule, UiShellModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
