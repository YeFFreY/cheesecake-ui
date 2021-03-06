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
      <cc-list-course-activity [courseId]='vm.course.id'></cc-list-course-activity>

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
  dateFormat = outputDateDayFormat;
  timeFormat = outputDateTimeFormat;

  constructor(public readonly facade: DetailsCourseFacadeService, private readonly route: ActivatedRoute) {
    this.route.paramMap.pipe(map(params => params.get('courseId')), untilDestroyed(this)).subscribe(calendarId => {
      if (calendarId) {
        this.facade.updateCriteria(calendarId);
      }
    });
  }

}
