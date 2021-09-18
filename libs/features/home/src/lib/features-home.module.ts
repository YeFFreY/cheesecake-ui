import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HomeComponent } from './home.component';

const featuresHomeRoutes: Route[] = [{ path: '', component: HomeComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(featuresHomeRoutes)],
  declarations: [
    HomeComponent
  ]
})
export class FeaturesHomeModule {
}
