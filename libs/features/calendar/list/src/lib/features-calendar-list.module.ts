import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ListCalendarComponent } from './list-calendar.component';

export const featuresCalendarListRoutes: Route[] = [
  {
    path: '', component: ListCalendarComponent, children: [
      {
        path: ':calendarId', children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: async () => (await import('@cheesecake-ui/features/calendar/details')).FeaturesCalendarDetailsModule
          },
          {
            path: 'courses', children: [
              {
                path: 'new',
                loadChildren: async () => (await import('@cheesecake-ui/features/calendar-course/create')).FeaturesCalendarCourseCreateModule
              },
              {
                path: ':courseId',
                loadChildren: async  () => (await import('@cheesecake-ui/features/calendar-course/details')).FeaturesCalendarCourseDetailsModule
              }
            ]
          }

        ]

      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(featuresCalendarListRoutes)],
  declarations: [
    ListCalendarComponent
  ]
})
export class FeaturesCalendarListModule {
}
