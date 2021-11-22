import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { DetailsCalendarComponent } from './details-calendar.component';

export const featuresCalendarDetailsRoutes: Route[] = [{ path: '', component: DetailsCalendarComponent}];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(featuresCalendarDetailsRoutes)],
  declarations: [
    DetailsCalendarComponent
  ],
})
export class FeaturesCalendarDetailsModule {}
