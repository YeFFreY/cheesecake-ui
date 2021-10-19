import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { DeletemeComponent } from './deleteme.component';

export const uiApplicationShellRoutes: Route[] = [
  {
    path: 'activities', children:[
      { path: 'new', loadChildren: async() => (await import('@cheesecake-ui/features/activity/create')).FeaturesActivityCreateModule}
    ]
  },
  {
    path: 'bob', component: DeletemeComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(uiApplicationShellRoutes)],
  declarations:[DeletemeComponent]
})
export class UiApplicationShellModule {}
