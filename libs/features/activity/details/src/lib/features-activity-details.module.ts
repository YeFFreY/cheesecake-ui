import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { DetailsActivityComponent } from './details-activity.component';
import { FeaturesActivitySkillListModule } from '@cheesecake-ui/features/activity-skill/list';

export const featuresActivityDetailsRoutes: Route[] = [{ path: '', component: DetailsActivityComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(featuresActivityDetailsRoutes),
    FeaturesActivitySkillListModule
  ],
  declarations: [
    DetailsActivityComponent
  ]
})
export class FeaturesActivityDetailsModule {
}
