import { FormControl } from '@angular/forms';

export const CheeseValidators = {
  notEmpty(control: FormControl) {
    const isEmpty = (control.value || '').trim().length === 0;
    return isEmpty ? { 'notEmpty': true} : null;
  }
}
