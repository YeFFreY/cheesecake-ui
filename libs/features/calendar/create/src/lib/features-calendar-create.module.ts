import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { CreateCalendarComponent } from './create-calendar.component';
import { UtilsFormModule } from '@cheesecake-ui/utils/form';

export const featuresCalendarCreateRoutes: Route[] = [{ path: '', component: CreateCalendarComponent}];

@NgModule({
  imports: [
    CommonModule,
    UtilsFormModule,
    RouterModule.forChild(featuresCalendarCreateRoutes)
  ],
  declarations: [
    CreateCalendarComponent
  ],
})
export class FeaturesCalendarCreateModule {}
