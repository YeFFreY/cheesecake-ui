import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ListActivityComponent } from './list-activity.component';

export const featuresActivityListRoutes: Route[] = [{ path: '', component: ListActivityComponent}];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(featuresActivityListRoutes)],
  declarations: [
    ListActivityComponent
  ]
})
export class FeaturesActivityListModule {
}
