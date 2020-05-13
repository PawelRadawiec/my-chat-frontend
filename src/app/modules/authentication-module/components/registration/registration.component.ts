import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SystemUser} from '../../model/system-user.model';
import {ErrorService} from '../../../../service/error.service';
import {SystemUserRegistration} from '../../../../store/system-user/system-user.actions';
import {MatStepper} from '@angular/material/stepper';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  request: SystemUser;
  registrationForm: FormGroup;

  // just for test
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    public errorService: ErrorService
  ) {
  }

  ngOnInit() {
    this.initRegistrationForm();
  }

  onSubmit() {
    const value = this.registrationForm.value;
    this.request = {
      username: value.username,
      email: value.email,
      password: value.password
    };
    this.store.dispatch(new SystemUserRegistration(this.request));
  }

  goNext(stepper: MatStepper) {
    stepper.next();
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }


  initRegistrationForm() {
    this.registrationForm = this.formBuilder.group({
      username: [],
      password: [],
      email: []
    });

    // just for test
    this.firstFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }


}
