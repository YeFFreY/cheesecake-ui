import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from './drawer.component';
import { DrawerBodyDirective } from './drawer-body.directive';
import { DrawerHeaderDirective } from './drawer-header.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DrawerComponent,
    DrawerBodyDirective,
    DrawerHeaderDirective
  ],
  exports: [DrawerComponent, DrawerBodyDirective, DrawerHeaderDirective]
})
export class SharedComponentsDrawerModule {
}
