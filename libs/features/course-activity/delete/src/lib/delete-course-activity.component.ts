import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ResourceId } from '@cheesecake-ui/core/api';
import { DeleteCourseActivityFacadeService } from './delete-course-activity-facade.service';

@Component({
  selector: 'cc-delete-course-activity[courseId][activityId][sectionTypeId]',
  template: `
    <button (click)='delete()' class='button'>delete</button>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[DeleteCourseActivityFacadeService]
})
export class DeleteCourseActivityComponent {
  @Input()
  public activityId!: ResourceId;

  @Input()
  public courseId!: ResourceId;

  @Input()
  public sectionTypeId!: ResourceId;

  @Output()
  public activityDeleted = new EventEmitter<ResourceId>()

  constructor(private readonly facade: DeleteCourseActivityFacadeService) {
    this.facade.submitted$.subscribe(courseId => this.activityDeleted.emit(courseId));
  }


  public delete() {
    this.facade.updateCriteria(this.courseId, this.activityId, this.sectionTypeId);
  }
}
