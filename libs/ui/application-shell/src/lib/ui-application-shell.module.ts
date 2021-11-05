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
          }]
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(uiApplicationShellRoutes)]
})
export class UiApplicationShellModule {
}
