import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HomeComponent } from './home.component';

export const featuresHomeRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule.forChild([
    { path: '', component: HomeComponent }
  ])],
  declarations: [
    HomeComponent
  ]
})
export class FeaturesHomeModule {
}
