import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { UtilsFormModule } from '@cheesecake-ui/utils/form';

const featuresAuthLoginRoutes: Route[] = [{ path: '', component: LoginComponent }];

@NgModule({
  imports: [
    CommonModule,
    UtilsFormModule,
    RouterModule.forChild(featuresAuthLoginRoutes)],
  declarations: [
    LoginComponent
  ]
})
export class FeaturesAuthLoginModule {
}
