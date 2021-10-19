import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CreateActivityFacadeService } from './create-activity-facade.service';

@Component({
  selector: 'cc-create-activity',
  template: `
    <div *ngIf='(this.facade.vm$ | async) as vm'>
      <form [formGroup]="facade.form" id='createActivityForm' (ngSubmit)='facade.submit()' errorTailor>
        <!-- container -->
        <div> <!-- padder -->
          <div> <!-- grid-->
            <div>
              <label for='name'>Activity Name</label>
              <input type='text' id='name' formControlName='name'>
            </div>
            <div>
              <label for='description'>Description</label>
              <textarea id='description' formControlName='description'></textarea>
            </div>
          </div>
        </div>
        <div>
          <div>{{vm.error?.summary}}</div>
          <div>
            <button type='submit'>Save</button>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CreateActivityFacadeService]
})
export class CreateActivityComponent {

  constructor(public readonly facade: CreateActivityFacadeService) {
  }
}
