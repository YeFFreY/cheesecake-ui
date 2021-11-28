import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCourseActivityComponent } from './list-course-activity.component';
import { SharedComponentsDrawerModule } from '@cheesecake-ui/shared/components/drawer';
import { FeaturesCourseActivityCreateModule } from '@cheesecake-ui/features/course-activity/create';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsDrawerModule,
    FeaturesCourseActivityCreateModule
  ],
  declarations: [
    ListCourseActivityComponent
  ],
  exports: [
    ListCourseActivityComponent
  ]
})
export class FeaturesCourseActivityListModule {}
