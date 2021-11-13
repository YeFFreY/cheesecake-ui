import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateActivityMaterialsComponent } from './create-activity-materials.component';


@NgModule({
  imports: [CommonModule],
  declarations: [
    CreateActivityMaterialsComponent
  ],
  exports: [CreateActivityMaterialsComponent]
})
export class FeaturesActivityMaterialsCreateModule {}
