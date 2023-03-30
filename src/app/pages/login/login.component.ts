import { Component, OnInit } from '@angular/core';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private snackbarService: SnackbarService
  ) {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  login() {
    this.submitted = true;
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (user: User) => {
          this.authService.setCurrentUser$(user);
          this.authService.createUserStorage(user);
          this.route.navigate(['/']);
        },
        (err) => this.snackbarService.openFailSnackBar(err.error)
      );
    }
  }
}
