import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CourseActivity, ListCourseActivityFacadeService, Section } from './list-course-activity-facade.service';
import { ResourceId } from '@cheesecake-ui/core/api';

@Component({
  selector: 'cc-list-course-activity[courseId]',
  template: `
    <ng-container *ngIf='facade.vm$ | async as vm'>
      <h3>Activities</h3>
      <button (click)='openAddActivityDrawer()' class='button' id='btn-add-activity'>Add activity</button>
      <div *ngFor='let section of vm.sections; trackBy: trackBySectionId' class='section-item'>
        <h4>{{section.sectionDescription}}</h4>
        <ul>
          <li *ngFor='let activity of section.activities; trackBy: trackByActivityId'
              class='activity-item'>{{activity.activityName}}</li>
        </ul>

      </div>
      <div *ngIf='vm.sections.length === 0'>No activities currently associated with the course</div>
    </ng-container>
    <cc-drawer [isOpen]='open' (drawerClosed)='open = false'>
      <ng-template ccDrawerHeader>
        <div><h3>Add activity</h3></div>
      </ng-template>
      <ng-template ccDrawerBody>
        <cc-create-course-activity [courseId]='courseId'
                                   (activityAdded)='onActivityAdded()'></cc-create-course-activity>
      </ng-template>
    </cc-drawer>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ListCourseActivityFacadeService]
})
export class ListCourseActivityComponent implements OnChanges {
  public open = false;

  @Input()
  courseId!: ResourceId;

  constructor(public readonly facade: ListCourseActivityFacadeService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.courseId) {
      this.refreshCourseActivities();
    }
  }

  trackBySectionId(index: number, section: Section) {
    return section.sectionTypeId;
  }

  trackByActivityId(index: number, activity: CourseActivity) {
    return activity.activityId;
  }

  onActivityAdded() {
    this.closeAddActivityDrawer();
    this.refreshCourseActivities();
  }

  public openAddActivityDrawer() {
    this.open = true;
  }

  private closeAddActivityDrawer() {
    this.open = false;
  }

  private refreshCourseActivities() {
    this.facade.updateCriteria(this.courseId);
  }
}
