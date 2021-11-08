import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { CreateSkillComponent } from './create-skill.component';
import { UtilsFormModule } from '@cheesecake-ui/utils/form';

export const featuresSkillCreateRoutes: Route[] = [{ path: '', component: CreateSkillComponent}];

@NgModule({
  imports: [
    CommonModule,
    UtilsFormModule,
    RouterModule.forChild(featuresSkillCreateRoutes)
  ],
  declarations: [
    CreateSkillComponent
  ],
})
export class FeaturesSkillCreateModule {}
