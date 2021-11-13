import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListActivityFacadeService } from './list-activity-facade.service';

@Component({
  selector: 'cc-list-activity',
  template: `
    <h1>Activities</h1>
    <a [routerLink]='["new"]' class='button'>New Activity</a>
    <a routerLink='../skills/new' class='button'>New Skill</a>
    <a routerLink='../equipments/new' class='button'>New Equipment</a>
    <div *ngIf='facade.vm$ | async as vm' class='container'>
      <div class='filter'>
        <h3>Categories</h3>
        <ul>
          <li>Lorem.</li>
          <li>Animi?</li>
          <li>Laboriosam?</li>
          <li>Tenetur.</li>
          <li>Nostrum.</li>
          <li>Rerum!</li>
          <li>Illo!</li>
        </ul>
      </div>
      <div class='content'>
        <div class='activities'>
          <div *ngFor='let activity of vm.activities'>
            <a [routerLink]='[activity.id, "details"]' class='unstyled'><h2>{{activity.name}}</h2></a>
            <p>{{activity.description}}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      height : 100%;
      width  : 100%;
    }

    .container {
      height                : 100%;
      width                 : 100%;
      display               : grid;
      grid-gap              : var(--space-xs);
      grid-template-areas   : "filter"
                              "content";
      grid-template-columns : 1fr;
    }

    .filter {
      grid-area : filter;
    }

    .content {
      grid-area             : content;
      display               : grid;
      grid-template-areas   : ". activities .";
      grid-template-columns : var(--space-xs) 1fr var(--space-xs);
      max-width             : var(--max-width);
    }

    .activities {
      grid-area : activities;
    }

    @media (min-width : 50rem) {
      .container {
        grid-gap              : var(--space-md);
        grid-template-areas   : "filter content";
        grid-template-columns : 1fr 2fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ListActivityFacadeService]
})
export class ListActivityComponent {

  constructor(public readonly facade: ListActivityFacadeService) {
  }

}
