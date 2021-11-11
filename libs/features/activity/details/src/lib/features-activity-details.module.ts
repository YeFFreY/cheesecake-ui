import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { DetailsActivityComponent } from './details-activity.component';
import { SharedComponentsDrawerModule } from '@cheesecake-ui/shared/components/drawer';
import { FeaturesActivitySkillCreateModule } from '@cheesecake-ui/features/activity-skill/create';

export const featuresActivityDetailsRoutes: Route[] = [{ path: '', component: DetailsActivityComponent}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(featuresActivityDetailsRoutes),
    FeaturesActivitySkillCreateModule,
    SharedComponentsDrawerModule
  ],
  declarations: [
    DetailsActivityComponent
  ],
})
export class FeaturesActivityDetailsModule {}
