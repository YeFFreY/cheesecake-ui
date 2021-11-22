import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { CreateCourseComponent } from './create-course.component';
import { UtilsFormModule } from '@cheesecake-ui/utils/form';
import { SharedComponentsSelectorModule } from '@cheesecake-ui/shared/components/selector';

export const featuresCalendarCourseCreateRoutes: Route[] = [{ path: '', component: CreateCourseComponent}];

@NgModule({
  imports: [
    CommonModule,
    UtilsFormModule,
    RouterModule.forChild(featuresCalendarCourseCreateRoutes),
    SharedComponentsSelectorModule
  ],
  declarations: [
    CreateCourseComponent
  ],
})
export class FeaturesCalendarCourseCreateModule {}
