import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListActivitySkillComponent } from './list-activity-skill.component';
import { FeaturesActivitySkillDeleteModule } from '@cheesecake-ui/features/activity-skill/delete';


@NgModule({
  imports: [CommonModule, FeaturesActivitySkillDeleteModule],
  declarations: [
    ListActivitySkillComponent
  ],
  exports: [ListActivitySkillComponent]
})
export class FeaturesActivitySkillListModule {
}
