import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { DetailsCourseComponent } from './details-course.component';
import { UtilsFormModule } from '@cheesecake-ui/utils/form';
import { FeaturesCourseActivityCreateModule } from '@cheesecake-ui/features/course-activity/create';
import { SharedComponentsDrawerModule } from '@cheesecake-ui/shared/components/drawer';

export const featuresCalendarCourseDetailsRoutes: Route[] = [{ path: '', component: DetailsCourseComponent }];

@NgModule({
  imports: [
    CommonModule,
    UtilsFormModule,
    RouterModule.forChild(featuresCalendarCourseDetailsRoutes),
    SharedComponentsDrawerModule,
    FeaturesCourseActivityCreateModule
  ],
  declarations: [
    DetailsCourseComponent
  ]
})
export class FeaturesCalendarCourseDetailsModule {
}
