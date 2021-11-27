import { Component } from '@angular/core';
import { DetailsCourseFacadeService } from './details-course-facade.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { outputDateDayFormat, outputDateTimeFormat } from '@cheesecake-ui/utils/constants';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'cc-details-course',
  template: `
    <div *ngIf='facade.vm$ | async as vm'>
      <div class='course'>
        <div class='course-timestamp'>
          <div>{{vm.course.start | date: dateFormat}}</div>
          <div>{{vm.course.start | date: timeFormat}} - {{vm.course.end | date: timeFormat}}</div>
        </div>
        <h2>Course to {{vm.course.classOverview.name}}</h2>
      </div>
      <button (click)='openAddActivityDrawer()' class='button' id='btn-add-activity'>Add activity</button>
      <cc-drawer [isOpen]='open' (drawerClosed)='open = false'>
        <ng-template ccDrawerHeader>
          <div ><h3>Add activity</h3></div>
        </ng-template>
        <ng-template ccDrawerBody>
          <cc-create-course-activity [courseId]='vm.course.id' (activityAdded)='onActivityAdded()'></cc-create-course-activity>
        </ng-template>
      </cc-drawer>
    </div>
  `,
  styles: [`
    .course {
      display : flex;
      gap     : var(--space-xs);
    }

    .course-timestamp {
      display        : flex;
      flex-direction : column;
    }
  `],
  // no changedetection "on push" here
  providers: [DetailsCourseFacadeService]
})
export class DetailsCourseComponent {
  public open = false;
  dateFormat = outputDateDayFormat;
  timeFormat = outputDateTimeFormat;

  constructor(public readonly facade: DetailsCourseFacadeService, private readonly route: ActivatedRoute) {
    this.route.paramMap.pipe(map(params => params.get('courseId')), untilDestroyed(this)).subscribe(calendarId => {
      if (calendarId) {
        this.facade.updateCriteria(calendarId);
      }
    });
  }


  public openAddActivityDrawer() {
    this.open = true;
  }

  private closeAddActivityDrawer() {
    this.open = false;
  }

  onActivityAdded() {
    this.closeAddActivityDrawer()
  }
}
