import { FormControl } from '@angular/forms';

export const CheeseValidators = {
  notEmpty(control: FormControl) {
    if(control.value == null) {
      return { 'notEmpty': true};
    }
    if(typeof control.value !== 'string') return null;

    const isEmpty = (control.value || '').trim().length === 0;
    return isEmpty ? { 'notEmpty': true} : null;
  }
}
