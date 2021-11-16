import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface Option {
  id: unknown;
  description: string;
}

@Component({
  selector: 'cc-selector[options]',
  template: `
    <button type='button' class='button' (click)='open = true'>
      <span>{{label}}</span><span>&nbsp;&nbsp;&nbsp;></span>
    </button>
    <cc-drawer [isOpen]='open' (drawerClosed)='open = false'>
      <ng-template ccDrawerHeader>
        <div><h3>Please select</h3></div>
      </ng-template>
      <ng-template ccDrawerBody>
        <div *ngFor='let option of options; trackBy: trackByOptionId'
             (click)='onClick(option)'
             class='selector-item'
             [ngClass]='option.id === value ? "selected": ""'>{{option.description}}</div>
      </ng-template>
    </cc-drawer>
  `,
  styles: [`
    .selected {
      font-weight : var(--font-weight-bold);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SelectorComponent,
    multi: true
  }]
})
export class SelectorComponent implements ControlValueAccessor {
  open = false;
  value: unknown;
  label = 'Please select';
  onChange!: (value: unknown) => void;
  onTouched!: () => void;
  disabled = false;

  @Input()
  public options!: Option[];

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: unknown): void {
    this.value = value;
    this.setLabel();
  }

  trackByOptionId(index: number, option: Option) {
    return option.id;
  }

  onClick(option: Option) {
    this.value = option.id;
    this.onChange(this.value);
    this.onTouched();
    this.setLabel();
    this.open = false;
  }

  private setLabel() {
    const selectedOption = this.options.find(option => option.id === this.value);
    this.label = selectedOption ? selectedOption.description : 'Please select';
  }
}
