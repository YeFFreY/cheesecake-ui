import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { ApiService, Resource, ResourceId } from '@cheesecake-ui/core/api';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export interface CourseDetails extends Resource {
  classOverview: { id: ResourceId, name: string };
  start: string;
  end: string;
}

@UntilDestroy()
@Injectable()
export class DetailsCourseFacadeService {

  private courseStore = new Subject<CourseDetails>();
  private idStore = new Subject<ResourceId>();

  private course$ = this.courseStore.pipe(distinctUntilChanged());
  private id$ = this.idStore.pipe(distinctUntilChanged());


  public vm$: Observable<{ course: CourseDetails }> = combineLatest([this.course$]).pipe(
    map(([course]) => ({ course })),
    untilDestroyed(this)
  );

  constructor(private api: ApiService) {
    this.id$.pipe(
      switchMap((id) => this.fetchCourse(id)),
      untilDestroyed(this)
    ).subscribe(result => this.courseStore.next(result.data));
  }

  public updateCriteria(id: ResourceId) {
    this.idStore.next(id);
  }

  private fetchCourse(id: ResourceId) {
    return this.api.sendQuery<CourseDetails>(`api/courses/${id}`);
  }
}
