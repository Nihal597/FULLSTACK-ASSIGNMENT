import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.scss',
})
export class PasswordRecoveryComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  state = 'initial';

  passwordRecoveryForm = this.fb.group({
    email: this.fb.nonNullable.control(''),
  });

  submit() {
    if (this.passwordRecoveryForm.valid) {
      this.authService.passwordRecovery(
        this.passwordRecoveryForm.getRawValue().email
      ).subscribe(() => {
        this.state = 'sent';
      });
    }
  }
}
