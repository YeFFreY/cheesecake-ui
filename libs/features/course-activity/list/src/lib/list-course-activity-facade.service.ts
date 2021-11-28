import { Injectable } from '@angular/core';
import { ApiService, ResourceId } from '@cheesecake-ui/core/api';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

export interface CourseActivity {
  activityId: ResourceId;
  activityName: string;
  sectionTypeId: ResourceId;
  sectionDescription: string;
}

export interface Section {
  sectionTypeId: ResourceId;
  sectionDescription: string;
  activities: CourseActivity[];
}

@UntilDestroy()
@Injectable()
export class ListCourseActivityFacadeService {
  private activitiesStore = new Subject<CourseActivity[]>();
  private criteriaStore = new Subject<ResourceId>();

  private activities$ = this.activitiesStore.asObservable().pipe(
    distinctUntilChanged(),
    map(this.courseActivitiesToSectionActivitiesMap)
  );
  private criteria$ = this.criteriaStore.asObservable();

  public vm$: Observable<{ sections: Section[] }>
    = combineLatest([this.activities$]).pipe(
    map(([sections]) => ({ sections }))
  );

  constructor(private api: ApiService) {
    this.criteria$.pipe(
      switchMap(courseId => this.fetchCourseActivities(courseId)),
      untilDestroyed(this)
    ).subscribe(result => this.activitiesStore.next(result.data));
  }

  private fetchCourseActivities(courseId: ResourceId) {
    return this.api.sendQuery<CourseActivity[]>(`api/course-activities/${courseId}`);
  }

  private courseActivitiesToSectionActivitiesMap(activities: CourseActivity[]): Section[] {
    const groupedActivities = activities.reduce((sectionsMap: { [key: string]: Section }, item: CourseActivity) => {
      const section = sectionsMap[item.sectionTypeId] || {
        sectionTypeId: item.sectionTypeId,
        sectionDescription: item.sectionDescription,
        activities: []
      };
      section.activities.push(item);
      sectionsMap[item.sectionTypeId] = section;
      return sectionsMap;
    }, {});
    return Object.values(groupedActivities);
  }

  public updateCriteria(courseId: ResourceId) {
    this.criteriaStore.next(courseId);
  }
}
