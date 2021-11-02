import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { DetailsActivityComponent } from './details-activity.component';

export const featuresActivityDetailsRoutes: Route[] = [{ path: '', component: DetailsActivityComponent}];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(featuresActivityDetailsRoutes)],
  declarations: [
    DetailsActivityComponent
  ],
})
export class FeaturesActivityDetailsModule {}
