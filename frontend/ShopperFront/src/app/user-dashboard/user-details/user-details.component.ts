import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userDetails: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private fb: FormBuilder,
              private router: Router) {
    this.createForm();
    this.returnUrl = '/';
    }

  ngOnInit() {
  }

  createForm() {
    this.userDetails = this.fb.group({
      name: [''],
      surname: [''],
      nickname: [''],
      phone: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.userDetails.invalid) {
      return;
    }

    this.loading = true;
  }
}
