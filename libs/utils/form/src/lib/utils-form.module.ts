import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorTailorModule } from '@ngneat/error-tailor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorTailorModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ErrorTailorModule
  ]
})
export class UtilsFormModule {
  static forRoot(): ModuleWithProviders<ErrorTailorModule> {
    return ErrorTailorModule.forRoot({
      errors: {
        useValue: {
          required: 'This field is required',
          notEmpty: 'This field is required',
          email: 'Please insert a valid email',
          minlength: ({ requiredLength, actualLength }) => `Expect ${requiredLength} but got ${actualLength}`,
        }
      }
    })
  }
}
