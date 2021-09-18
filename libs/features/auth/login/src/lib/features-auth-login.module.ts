import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const featuresAuthLoginRoutes: Route[] = [{ path: '', component: LoginComponent }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(featuresAuthLoginRoutes)],
  declarations: [
    LoginComponent
  ]
})
export class FeaturesAuthLoginModule {
}
