import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';
import { RouterLink } from '@angular/router';

export const RetypePasswordValidator: ValidatorFn = (control: AbstractControl) => {
  const password = control.get('password');
  const retypePassword = control.get('retypePassword');
  if (password?.value !== retypePassword?.value) {
    return { passwordMatch: true };
  }
  return null;
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  status = 'initial';
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  registerForm = this.fb.group(
    {
      firstName: this.fb.nonNullable.control('', [Validators.required]),
      lastName: this.fb.nonNullable.control('', [Validators.required]),
      location: this.fb.nonNullable.control('', [Validators.required]),
      email: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      retypePassword: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    {
      validators: [RetypePasswordValidator],
    }
  );

  submit() {
    if (this.registerForm.valid) {
      const { lastName, firstName, location, password, email } =
        this.registerForm.getRawValue();
      this.authService
        .register({
          name: firstName + ' ' + lastName,
          email,
          password,
          location,
        })
        .subscribe(() => {
          this.status = 'successful';
        });
    }
  }
}
