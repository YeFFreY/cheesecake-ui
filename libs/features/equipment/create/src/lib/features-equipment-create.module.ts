import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { CreateEquipmentComponent } from './create-equipment.component';
import { UtilsFormModule } from '@cheesecake-ui/utils/form';

export const featuresEquipmentCreateRoutes: Route[] = [{ path: '', component: CreateEquipmentComponent }];

@NgModule({
  imports: [
    CommonModule,
    UtilsFormModule,
    RouterModule.forChild(featuresEquipmentCreateRoutes)
  ],
  declarations: [
    CreateEquipmentComponent
  ]
})
export class FeaturesEquipmentCreateModule {
}
