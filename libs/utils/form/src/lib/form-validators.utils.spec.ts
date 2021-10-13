import { CheeseValidators } from './form-validators.utils';
import { FormControl } from '@angular/forms';

describe('CheeseValidators', () => {
  it('should validate empty string', () => {
    expect(CheeseValidators.notEmpty(new FormControl(''))).toEqual({ notEmpty: true });
    expect(CheeseValidators.notEmpty(new FormControl('     '))).toEqual({ notEmpty: true });
    expect(CheeseValidators.notEmpty(new FormControl(null))).toEqual({ notEmpty: true });
    expect(CheeseValidators.notEmpty(new FormControl(undefined))).toEqual({ notEmpty: true });
    expect(CheeseValidators.notEmpty(new FormControl('a   '))).toEqual(null);
    expect(CheeseValidators.notEmpty(new FormControl('   a'))).toEqual(null);
  });
});
