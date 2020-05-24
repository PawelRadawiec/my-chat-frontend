import {Component, OnInit, ViewChild} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegistrationStep, SystemUser} from '../../model/system-user.model';
import {ErrorService} from '../../../../service/error.service';
import {RegistrationRequest} from '../../../../store/system-user/system-user.actions';
import {MatStepper} from '@angular/material/stepper';
import {Observable, Subscription} from 'rxjs';
import {SystemUserState} from '../../../../store/system-user/system-user.state';
import {Registration} from '../../model/registration.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;
  @Select(SystemUserState.getRegistration) registration$: Observable<Registration>;

  registration: Registration;
  subscriptions: Subscription[] = [];
  request: SystemUser = new SystemUser();
  registrationForm: FormGroup;
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
    this.registration = this.setDefaultRegistration();
    this.subscriptions.push(this.registration$.subscribe(registration => {
      if (registration) {
        this.stepper.selectedIndex = this.setSelectedIndex(registration.currentStep);
        this.registration = registration;
      }
    }));
  }

  goNext() {
    this.store.dispatch(new RegistrationRequest(this.registration));
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  setDefaultRegistration() {
    const request: Registration = {
      previousStep: null,
      nextStep: RegistrationStep.ADDRESS,
      currentStep: RegistrationStep.ACCOUNT,
      user: this.request
    };
    return request;
  }

  setSelectedIndex(step: RegistrationStep) {
    switch (step) {
      case RegistrationStep.ACCOUNT:
        return 0;
      case RegistrationStep.ADDRESS:
        return 1;
      case RegistrationStep.ACTIVATION:
        return 2;
    }
  }

  initRegistrationForm() {
    this.registrationForm = this.formBuilder.group({
      username: [],
      password: [],
      email: []
    });

    // just for test
    this.firstFormGroup = this.formBuilder.group({
      username: [''],
      password: [''],
      email: ['']
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }


}
