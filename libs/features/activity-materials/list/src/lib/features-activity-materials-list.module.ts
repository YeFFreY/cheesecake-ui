import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListActivityMaterialsComponent } from './list-activity-materials.component';
import { SharedComponentsDrawerModule } from '@cheesecake-ui/shared/components/drawer';
import { FeaturesActivityMaterialsCreateModule } from '@cheesecake-ui/features/activity-materials/create';


@NgModule({
  imports: [
    CommonModule,
    SharedComponentsDrawerModule,
    FeaturesActivityMaterialsCreateModule
  ],
  declarations: [
    ListActivityMaterialsComponent
  ],
  exports: [ListActivityMaterialsComponent]
})
export class FeaturesActivityMaterialsListModule {
}
