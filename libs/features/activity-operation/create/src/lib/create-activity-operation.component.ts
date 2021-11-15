import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CreateActivityOperationFacadeService } from './create-activity-operation-facade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'cc-create-activity-operation',
  template: `
    <div class='illustration'
         style='background-image: url("https://via.placeholder.com/400x600.png/09f/fff?text=un+plan+en+plusieurs+etapes+ou+une+recette")'>
    </div>
    <div *ngIf='(this.facade.vm$ | async) as vm' class='form'>
      <form [formGroup]='facade.form' id='createActivityOperationForm' (ngSubmit)='facade.submit()' errorTailor>
        <section>{{vm.error?.summary}}</section>
        <section>
          <div class='form-grid'>
            <div class='form-element'>
              <label for='name'>Operation Type</label>
              <input type='text' id='type' formControlName='type' class='input'>
            </div>
            <div class='form-element'>
              <label for='description'>Description</label>
              <textarea id='description' formControlName='description' class='input' rows='5'></textarea>
            </div>
          </div>
        </section>
        <section class='form-footer'>
          <button type='submit' class='button'>Save</button>
        </section>
      </form>
    </div>
  `,
  styles: [`
    :host {
      height                : 100%;
      width                 : 100%;
      display               : grid;
      grid-gap              : var(--space-xs);
      grid-template-areas   : "illustration"
                              "content";
      grid-template-columns : 1fr;
    }

    .illustration {
      min-height          : 5em; /* TODO is this supposed to become a variable ? like illustration-min-height ?*/
      grid-area           : illustration;
      background-size     : cover;
      background-position : center center;
      background-repeat   : no-repeat;
    }

    .form {
      grid-area             : content;
      display               : grid;
      grid-template-areas   : ". form .";
      grid-template-columns : var(--space-xs) 1fr var(--space-xs);
      max-width             : var(--max-width);
    }

    form {
      grid-area : form;
    }

    @media (min-width : 50rem) {
      :host {
        grid-gap              : var(--space-md);
        grid-template-areas   : "illustration content";
        grid-template-columns : 1fr 2fr;
      }
    }

  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CreateActivityOperationFacadeService]
})
export class CreateActivityOperationComponent {

  constructor(public readonly facade: CreateActivityOperationFacadeService, private router: Router, private route: ActivatedRoute) {
    this.facade.submitted$.pipe(untilDestroyed(this)).subscribe(() => router.navigate(['../..', 'details'], { relativeTo: route }));

    const activityId = this.route.snapshot.paramMap.get('id');
    if (activityId) {
      this.facade.updateCriteria(activityId);
    }
  }

}
