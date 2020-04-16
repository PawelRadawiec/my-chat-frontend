import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthorizationService} from '../../service/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = 'Invalid credentials';
  invalidLogin = false;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthorizationService,
    private formBuilder: FormBuilder,
    protected store: Store
  ) {
  }

  ngOnInit() {
    this.initLoginForm();
  }

  onSubmit() {
    const formValue = {
      login: this.loginForm.value.login,
      password: this.loginForm.value.password
    };
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      login: [],
      password: []
    });
  }


}
