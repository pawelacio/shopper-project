import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  loading = false;
  submitted = false;
  message = {
    content: '',
    status: ''
  };

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      // repassword: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.signUp(this.signupForm.value)
      .subscribe(
        data => {
          this.loading = false;
          this.router.navigate(['/signin']);
        },
        err => {
          this.loading = false;
          this.message.content = err.error.message;
          this.message.status = 'error';
        }
      );
  }
}
