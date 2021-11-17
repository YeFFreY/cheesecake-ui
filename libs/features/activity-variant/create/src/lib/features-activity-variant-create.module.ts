import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { CreateActivityVariantComponent } from './create-activity-variant.component';
import { UtilsFormModule } from '@cheesecake-ui/utils/form';

export const featuresActivityVariantCreateRoutes: Route[] = [{ path: '', component: CreateActivityVariantComponent}];

@NgModule({
  imports: [
    CommonModule,
    UtilsFormModule,
    RouterModule.forChild(featuresActivityVariantCreateRoutes)
  ],
  declarations: [
    CreateActivityVariantComponent
  ],
})
export class FeaturesActivityVariantCreateModule {}
