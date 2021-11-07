import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { DetailsActivityComponent } from './details-activity.component';
import { SharedComponentsDrawerModule } from '@cheesecake-ui/shared/components/drawer';

export const featuresActivityDetailsRoutes: Route[] = [{ path: '', component: DetailsActivityComponent}];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(featuresActivityDetailsRoutes), SharedComponentsDrawerModule],
  declarations: [
    DetailsActivityComponent
  ],
})
export class FeaturesActivityDetailsModule {}
