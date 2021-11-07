import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef
} from '@angular/core';
import { DrawerBodyDirective } from './drawer-body.directive';
import { DrawerHeaderDirective } from './drawer-header.directive';

@Component({
  selector: 'cc-drawer',
  template: `
    <div [class.is-open]='isOpen' class='overlay' (click)='onDrawerClose()'></div>
    <div [class.is-open]='isOpen' class='wrapper'>
      <button class='close' (click)='onDrawerClose()'>X</button>
      <ng-container *ngIf='isOpen'>
        <div class='header'>
          <ng-container *ngTemplateOutlet='drawerHeaderRef'></ng-container>
        </div>
        <div class='body'>
          <ng-container *ngTemplateOutlet='drawerBodyRef'></ng-container>
        </div>
      </ng-container>
    </div>

  `,
  styles: [`
    .overlay {
      position         : absolute;
      top              : 0;
      right            : 0;
      width            : 100%;
      height           : 100vh;
      background-color : var(--color-overlay);
      opacity          : 0;
      transition       : all 200ms;
      cursor           : default;
      z-index          : -1;
    }

    .wrapper {
      position   : absolute;
      top        : 0;
      right      : -100%;
      width      : 100%;
      height     : 100vh;
      background : var(--color-primary-bg);
      transition : all 200ms;
      box-shadow : var(--shadow-side-700);
    }

    .close {
      position : absolute;
      top      : var(--space-xs);
      right    : var(--space-xs);
    }

    .wrapper.is-open {
      z-index : 1001;
      right   : 0;
    }

    .overlay.is-open {
      z-index : 1000;
      opacity : 1;
    }

    @media (min-width : 50rem) {
      .wrapper {
        right : -30rem;
        width : 30rem;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerComponent {
  @Input() isOpen = false;
  @Output() drawerClosed = new EventEmitter();

  @ContentChild(DrawerBodyDirective, { read: TemplateRef })
  drawerBodyRef: TemplateRef<unknown> | null = null;

  @ContentChild(DrawerHeaderDirective, { read: TemplateRef })
  drawerHeaderRef: TemplateRef<unknown> | null = null;

  onDrawerClose() {
    this.drawerClosed.emit();
  }


}
