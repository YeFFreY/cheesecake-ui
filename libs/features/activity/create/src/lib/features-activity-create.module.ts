import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { CreateActivityComponent } from './create-activity.component';
import { UtilsFormModule } from '@cheesecake-ui/utils/form';

export const featuresActivityCreateRoutes: Route[] = [{ path: '', component: CreateActivityComponent}];

@NgModule({
  imports: [
    CommonModule,
    UtilsFormModule,
    RouterModule.forChild(featuresActivityCreateRoutes)],
  declarations: [
    CreateActivityComponent
  ],
})
export class FeaturesActivityCreateModule {}
