import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCourseActivityComponent } from './list-course-activity.component';
import { SharedComponentsDrawerModule } from '@cheesecake-ui/shared/components/drawer';
import { FeaturesCourseActivityCreateModule } from '@cheesecake-ui/features/course-activity/create';
import { FeaturesCourseActivityDeleteModule } from '@cheesecake-ui/features/course-activity/delete';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsDrawerModule,
    FeaturesCourseActivityCreateModule,
    FeaturesCourseActivityDeleteModule
  ],
  declarations: [
    ListCourseActivityComponent
  ],
  exports: [
    ListCourseActivityComponent
  ]
})
export class FeaturesCourseActivityListModule {}
