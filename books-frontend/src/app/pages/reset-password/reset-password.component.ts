import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RetypePasswordValidator } from '../register/register.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  status = "initial"

  resetPasswordForm = this.fb.group(
    {
      password: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      retypePassword: this.fb.nonNullable.control('', [Validators.required]),
    },
    { validators: [RetypePasswordValidator] }
  );

  get passwordControl() {
    return this.resetPasswordForm.controls.password;
  }

  get retypePasswordControl() {
    return this.resetPasswordForm.controls.retypePassword;
  }

  submit() {
    if (this.resetPasswordForm.valid) {
      const { id, code } = this.route.snapshot.queryParams;
      this.authService.passwordReset(
        id,
        code,
        this.resetPasswordForm.getRawValue().password
      ).subscribe(() => {
        this.status = "successful"
      });
    }
  }
}
