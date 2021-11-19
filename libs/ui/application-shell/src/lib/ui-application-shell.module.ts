import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

export const uiApplicationShellRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'activities' },
  {
    path: 'activities', children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: async () => (await import('@cheesecake-ui/features/activity/list')).FeaturesActivityListModule
      },
      {
        path: 'new',
        loadChildren: async () => (await import('@cheesecake-ui/features/activity/create')).FeaturesActivityCreateModule
      },
      {
        path: ':id',
        children: [
          {
            path: 'details',
            loadChildren: async () => (await import('@cheesecake-ui/features/activity/details')).FeaturesActivityDetailsModule
          },
          {
            path: 'edit',
            loadChildren: async () => (await import('@cheesecake-ui/features/activity/edit')).FeaturesActivityEditModule
          },
          {
            path: 'operations',
            children: [
              {
                path: 'new',
                loadChildren: async () => (await import('@cheesecake-ui/features/activity-operation/create')).FeaturesActivityOperationCreateModule
              }
            ]
          },
          {
            path: 'variants',
            children: [
              {
                path: 'new',
                loadChildren: async () => (await import('@cheesecake-ui/features/activity-variant/create')).FeaturesActivityVariantCreateModule
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: 'skills', children: [
      {
        path: 'new',
        loadChildren: async () => (await import('@cheesecake-ui/features/skill/create')).FeaturesSkillCreateModule
      }
    ]
  },
  {
    path: 'equipments', children: [
      {
        path: 'new',
        loadChildren: async () => (await import('@cheesecake-ui/features/equipment/create')).FeaturesEquipmentCreateModule
      }
    ]
  },
  {
    path: 'calendars', children: [
      {
        path: 'new',
        loadChildren: async () => (await import('@cheesecake-ui/features/calendar/create')).FeaturesCalendarCreateModule
      }
    ]
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(uiApplicationShellRoutes)]
})
export class UiApplicationShellModule {
}
