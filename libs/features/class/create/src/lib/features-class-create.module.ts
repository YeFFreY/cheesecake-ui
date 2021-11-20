import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { CreateClassComponent } from './create-class.component';
import { UtilsFormModule } from '@cheesecake-ui/utils/form';

const featuresClassCreateRoutes: Route[] = [{ path: '', component: CreateClassComponent}];

@NgModule({
  imports: [
    CommonModule,
    UtilsFormModule,
    RouterModule.forChild(featuresClassCreateRoutes)
  ],
  declarations: [
    CreateClassComponent
  ],
})
export class FeaturesClassCreateModule {}
