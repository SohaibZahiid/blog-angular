import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../login/login.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  // Form was submitted?
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private snackbarService: SnackbarService
  ) {
    this.registerForm = this.formBuilder.group({
      username: [null, [Validators.required, this.noSpaceAllowed]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
      img: [null],
    });
  }

  async registerUser() {
    // For showing error messages only when form is submitted
    this.submitted = true;
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      // Gets file selected by user and converts to base64
      let base64;
      if (this.registerForm.get('img')?.value) {
        base64 = await this.convertToBase64(
          this.registerForm.get('img')!.value
        );
      }

      const user: User = {
        username: this.registerForm.value.username ?? '',
        email: this.registerForm.value.email ?? '',
        password: this.registerForm.value.password ?? '',
        img: base64 ?? '',
      };

      this.authService.register(user).subscribe(
        (res) => {
          this.snackbarService.openSuccessSnackBar(res);
          this.route.navigate(['/login']);
        },
        (err) => this.snackbarService.openFailSnackBar(err.error)
      );
    }
  }

  // Gets called every time user selects file
  handleFileInput(event: Event) {
    // const target = e.target as HTMLInputElement;
    // const files = target.files as FileList;
    // this.file = files.item(0);
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files.item(0);
      this.registerForm.get('img')!.setValue(file);
    }
  }

  // Converts image to a base64 string
  convertToBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  // Validates if input contains spaces
  noSpaceAllowed(control: FormControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { noSpaceAllowed: true };
    }
    return null;
  }
}
