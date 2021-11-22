import { Component } from '@angular/core';
import { CreateCourseFacadeService } from './create-course-facade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'cc-create-course',
  template: `
    <div *ngIf='(this.facade.vm$ | async) as vm' class='form'>
      <form [formGroup]='facade.form' id='createActivityOperationForm' (ngSubmit)='facade.submit()' errorTailor>
        <section>{{vm.error?.summary}}</section>
        <section>
          <div class='form-grid'>
            <div class='form-element'>
              <label for='name'>Class</label>
              <cc-selector id='classId' formControlName='classId' [options]='vm.classes'></cc-selector>
            </div>
            <div class='form-element'>
              <label for='description'>Start</label>
              <input type='datetime-local' id='start' formControlName='start' class='input'>
            </div>
            <div class='form-element'>
              <label for='description'>End</label>
              <input type='datetime-local' id='end' formControlName='end' class='input'>
            </div>
          </div>
        </section>
        <section class='form-footer'>
          <button type='submit' class='button'>Save</button>
        </section>
      </form>
    </div>
  `,
  styles: [
  ],
  // no changedetection "on push" here
  providers: [CreateCourseFacadeService]
})
export class CreateCourseComponent  {

  constructor(public readonly facade: CreateCourseFacadeService, private readonly route: ActivatedRoute, private readonly router: Router) {
    this.route.paramMap.pipe(map(params => params.get('calendarId'))).subscribe(calendarId => {
      if (calendarId) {
        this.facade.updateCriteria(calendarId);
      }
    });

    this.facade.submitted$.pipe(untilDestroyed(this)).subscribe((id) => router.navigate(['..', id], { relativeTo: route }));
  }

}
