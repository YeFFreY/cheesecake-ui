import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { EditActivityComponent } from './edit-activity.component';
import { UtilsFormModule } from '@cheesecake-ui/utils/form';

export const featuresActivityEditRoutes: Route[] = [{ path: '', component: EditActivityComponent}];

@NgModule({
  imports: [
    CommonModule,
    UtilsFormModule,
    RouterModule.forChild(featuresActivityEditRoutes)
  ],
  declarations: [
    EditActivityComponent
  ],
})
export class FeaturesActivityEditModule {}
