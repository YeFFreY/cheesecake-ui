import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCourseActivityComponent } from './create-course-activity.component';
import { UtilsFormModule } from '@cheesecake-ui/utils/form';
import { SharedComponentsSelectorModule } from '@cheesecake-ui/shared/components/selector';


@NgModule({
  imports: [CommonModule, UtilsFormModule, SharedComponentsSelectorModule],
  declarations: [
    CreateCourseActivityComponent
  ],
  exports: [CreateCourseActivityComponent]
})
export class FeaturesCourseActivityCreateModule {}
