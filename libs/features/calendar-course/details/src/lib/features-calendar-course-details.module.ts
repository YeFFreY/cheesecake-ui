import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { DetailsCourseComponent } from './details-course.component';
import { UtilsFormModule } from '@cheesecake-ui/utils/form';

export const featuresCalendarCourseDetailsRoutes: Route[] = [{ path: '', component: DetailsCourseComponent}];

@NgModule({
  imports: [
    CommonModule,
    UtilsFormModule,
    RouterModule.forChild(featuresCalendarCourseDetailsRoutes)
  ],
  declarations: [
    DetailsCourseComponent
  ],
})
export class FeaturesCalendarCourseDetailsModule {}
