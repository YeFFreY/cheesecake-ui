import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UiShellModule } from '@cheesecake-ui/ui/shell';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, UiShellModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
