import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { DetailsCourseComponent } from './details-course.component';
import { UtilsFormModule } from '@cheesecake-ui/utils/form';
import { FeaturesCourseActivityListModule } from '@cheesecake-ui/features/course-activity/list';

export const featuresCalendarCourseDetailsRoutes: Route[] = [{ path: '', component: DetailsCourseComponent }];

@NgModule({
  imports: [
    CommonModule,
    UtilsFormModule,
    RouterModule.forChild(featuresCalendarCourseDetailsRoutes),
    FeaturesCourseActivityListModule
  ],
  declarations: [
    DetailsCourseComponent
  ]
})
export class FeaturesCalendarCourseDetailsModule {
}
