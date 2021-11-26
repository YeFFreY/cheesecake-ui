import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { DetailsCalendarComponent } from './details-calendar.component';
import { SharedComponentsCalendarModule } from '@cheesecake-ui/shared/components/calendar';
import { UtilsFormModule } from '@cheesecake-ui/utils/form';

export const featuresCalendarDetailsRoutes: Route[] = [{ path: '', component: DetailsCalendarComponent}];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(featuresCalendarDetailsRoutes), SharedComponentsCalendarModule, UtilsFormModule],
  declarations: [
    DetailsCalendarComponent
  ],
})
export class FeaturesCalendarDetailsModule {}
