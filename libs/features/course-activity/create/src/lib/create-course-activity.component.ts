import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { CreateCourseActivityFacadeService } from './create-course-activity-facade.service';
import { ResourceId } from '@cheesecake-ui/core/api';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'cc-create-course-activity[courseId]',
  template: `
    <div *ngIf='(this.facade.vm$ | async) as vm' class='form'>
      <form [formGroup]='facade.form' id='createCourseActivityForm' (ngSubmit)='facade.submit()' errorTailor>
        <section>{{vm.error?.summary}}</section>
        <section>
          <div class='form-grid'>
            <div class='form-element'>
              <label for='courseSectionTypeId'>Section</label>
              <cc-selector id='courseSectionTypeId' formControlName='courseSectionTypeId' [options]='vm.sectionTypes'></cc-selector>
            </div>
            <div class='form-element'>
              <label for='activityId'>Activity</label>
              <cc-selector id='activityId' formControlName='activityId' [options]='vm.activities'></cc-selector>
            </div>
          </div>
        </section>
        <section class='form-footer'>
          <button type='submit' class='button'>Save</button>
        </section>
      </form>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CreateCourseActivityFacadeService]
})
export class CreateCourseActivityComponent implements OnChanges {

  @Input()
  courseId!: ResourceId;

  @Output()
  activityAdded = new EventEmitter()

  constructor(public readonly facade: CreateCourseActivityFacadeService) {
    this.facade.submitted$.pipe(untilDestroyed(this)).subscribe(() => {
      this.activityAdded.emit()
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.courseId) {
      this.facade.updateCriteria(this.courseId);
    }
  }
}
