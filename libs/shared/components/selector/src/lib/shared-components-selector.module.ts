import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorComponent } from './selector.component';
import { UtilsFormModule } from '@cheesecake-ui/utils/form';
import { SharedComponentsDrawerModule } from '@cheesecake-ui/shared/components/drawer';

@NgModule({
  imports: [
    CommonModule,
    UtilsFormModule,
    SharedComponentsDrawerModule
  ],
  declarations: [
    SelectorComponent
  ],
  exports: [SelectorComponent]
})
export class SharedComponentsSelectorModule {}
