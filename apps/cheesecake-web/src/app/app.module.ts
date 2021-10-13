import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UiShellModule } from '@cheesecake-ui/ui/shell';
import { CoreAuthModule } from '@cheesecake-ui/core-auth';
import { CoreApiModule } from '@cheesecake-ui/core/api';
import { UtilsFormModule } from '@cheesecake-ui/utils/form';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreApiModule,
    CoreAuthModule,
    UiShellModule,
    UtilsFormModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
