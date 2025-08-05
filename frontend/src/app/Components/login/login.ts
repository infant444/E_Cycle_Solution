import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserServices } from '../../Services/user/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from "../../sub_component/title/title";

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, Title],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  passShow: boolean = false;
  passIcon: string = "visibility";
  passType: string = "password";
  returnUrl = '';

  constructor
    (
      private formBuilder: FormBuilder,
      private user: UserServices,
      private activateRouter: ActivatedRoute,
      private router: Router
    ) {

  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    })
    this.returnUrl = this.activateRouter.snapshot.queryParams.returnUrl;

  }
  get FC() {
    return this.loginForm.controls;
  }
  submit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.user.login({ email: this.FC.email.value, password: this.FC.password.value }).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
      // window.location.reload();
    });
  }
  passShows() {
    if (!this.passShow) {
      this.passIcon = 'visibility_off';
      this.passType = 'text';
      this.passShow = true;
    }
    else {
      this.passIcon = 'visibility';
      this.passType = 'password';
      this.passShow = false;
    }
  }
}
