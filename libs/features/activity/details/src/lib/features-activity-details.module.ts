import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { DetailsActivityComponent } from './details-activity.component';
import { FeaturesActivitySkillListModule } from '@cheesecake-ui/features/activity-skill/list';
import { FeaturesActivityMaterialsListModule } from '@cheesecake-ui/features/activity-materials/list';
import { FeaturesActivityOperationListModule } from '@cheesecake-ui/features/activity-operation/list';
import { FeaturesActivityVariantListModule } from '@cheesecake-ui/features/activity-variant/list';

export const featuresActivityDetailsRoutes: Route[] = [{ path: '', component: DetailsActivityComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(featuresActivityDetailsRoutes),
    FeaturesActivitySkillListModule,
    FeaturesActivityMaterialsListModule,
    FeaturesActivityOperationListModule,
    FeaturesActivityVariantListModule
  ],
  declarations: [
    DetailsActivityComponent
  ]
})
export class FeaturesActivityDetailsModule {
}
