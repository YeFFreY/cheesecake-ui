import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListActivitySkillComponent } from './list-activity-skill.component';
import { FeaturesActivitySkillDeleteModule } from '@cheesecake-ui/features/activity-skill/delete';
import { FeaturesActivitySkillCreateModule } from '@cheesecake-ui/features/activity-skill/create';
import { SharedComponentsDrawerModule } from '@cheesecake-ui/shared/components/drawer';


@NgModule({
  imports: [
    CommonModule,
    FeaturesActivitySkillCreateModule,
    FeaturesActivitySkillDeleteModule,
    SharedComponentsDrawerModule
  ],
  declarations: [
    ListActivitySkillComponent
  ],
  exports: [ListActivitySkillComponent]
})
export class FeaturesActivitySkillListModule {
}
