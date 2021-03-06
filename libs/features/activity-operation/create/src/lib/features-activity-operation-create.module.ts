import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { CreateActivityOperationComponent } from './create-activity-operation.component';
import { UtilsFormModule } from '@cheesecake-ui/utils/form';
import { SharedComponentsSelectorModule } from '@cheesecake-ui/shared/components/selector';

export const featuresActivityOperationCreateRoutes: Route[] = [{ path: '', component: CreateActivityOperationComponent}];

@NgModule({
  imports: [
    CommonModule,
    UtilsFormModule,
    RouterModule.forChild(featuresActivityOperationCreateRoutes),
    SharedComponentsSelectorModule
  ],
  declarations: [
    CreateActivityOperationComponent
  ],
})
export class FeaturesActivityOperationCreateModule {}
