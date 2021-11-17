import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListActivityOperationComponent } from './list-activity-operation.component';


@NgModule({
  imports: [CommonModule],
  declarations: [
    ListActivityOperationComponent
  ],
  exports: [ ListActivityOperationComponent]
})
export class FeaturesActivityOperationListModule {
}
