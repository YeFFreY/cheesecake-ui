import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListActivityMaterialsComponent } from './list-activity-materials.component';
import { SharedComponentsDrawerModule } from '@cheesecake-ui/shared/components/drawer';
import { FeaturesActivityMaterialsCreateModule } from '@cheesecake-ui/features/activity-materials/create';
import { FeaturesActivityMaterialsDeleteModule } from '@cheesecake-ui/features/activity-materials/delete';


@NgModule({
  imports: [
    CommonModule,
    SharedComponentsDrawerModule,
    FeaturesActivityMaterialsCreateModule,
    FeaturesActivityMaterialsDeleteModule
  ],
  declarations: [
    ListActivityMaterialsComponent
  ],
  exports: [ListActivityMaterialsComponent]
})
export class FeaturesActivityMaterialsListModule {
}
