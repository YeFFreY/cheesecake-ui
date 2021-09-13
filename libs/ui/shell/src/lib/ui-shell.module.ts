import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, PreloadAllModules } from '@angular/router';
import { GuestLayoutComponent } from './components/guest-layout/guest-layout.component';
import { ApplicationLayoutComponent } from './components/application-layout/application-layout.component';

export const uiShellRoutes: Route[] = [
  {
    path: '', component: GuestLayoutComponent
  },
  {
    path: 'app', component: ApplicationLayoutComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(uiShellRoutes, {
      paramsInheritanceStrategy: 'always',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule],
  declarations: [
    GuestLayoutComponent,
    ApplicationLayoutComponent
  ]
})
export class UiShellModule {
}
