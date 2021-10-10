import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, PreloadAllModules } from '@angular/router';
import { GuestLayoutComponent } from './components/guest-layout/guest-layout.component';
import { ApplicationLayoutComponent } from './components/application-layout/application-layout.component';
import { HeaderComponent } from './components/header/header.component';

export const uiShellRoutes: Route[] = [
  {
    path: '', component: GuestLayoutComponent, children: [
      { path: '', loadChildren: async () => (await import('@cheesecake-ui/features/home')).FeaturesHomeModule },
      {
        path: 'login',
        loadChildren: async () => (await import('@cheesecake-ui/features/auth/login')).FeaturesAuthLoginModule
      }
    ]
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
    ApplicationLayoutComponent,
    HeaderComponent
  ]
})
export class UiShellModule {
}
