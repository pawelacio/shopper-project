import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  message = {
    content: '',
    status: ''
  };

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {
    this.createForm();
    this.returnUrl = '/';
    }

  ngOnInit() {
  }

  createForm() {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.signInForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.signInForm.controls.email.value, this.signInForm.controls.password.value)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        err => {
          this.loading = false;
          console.log(err);
          this.message.content = err.error.message;
          this.message.status = 'error';
        }
      );
  }

}
