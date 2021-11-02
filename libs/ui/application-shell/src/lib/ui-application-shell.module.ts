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
        path: 'details/:id',
        loadChildren: async () => (await import('@cheesecake-ui/features/activity/details')).FeaturesActivityDetailsModule
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(uiApplicationShellRoutes)],
})
export class UiApplicationShellModule {
}
