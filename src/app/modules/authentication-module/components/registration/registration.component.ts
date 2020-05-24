import {Component, OnInit, ViewChild} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RegistrationStep, SystemUser} from '../../model/system-user.model';
import {ErrorService} from '../../../../service/error.service';
import {RegistrationRequest} from '../../../../store/system-user/system-user.actions';
import {MatStepper} from '@angular/material/stepper';
import {Observable, Subscription} from 'rxjs';
import {SystemUserState} from '../../../../store/system-user/system-user.state';
import {Registration} from '../../model/registration.model';
import {Address} from '../../model/address.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;
  @Select(SystemUserState.getRegistration) registration$: Observable<Registration>;
  private subscriptions: Subscription[] = [];

  registration: Registration;
  accountFormGroup: FormGroup;
  addressFormGroup: FormGroup;

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
    const currentStep = this.registration.currentStep;
    if (currentStep === RegistrationStep.ACCOUNT) {
      this.registration.user = new SystemUser(this.accountFormGroup.value);
    }
    if (currentStep === RegistrationStep.ADDRESS) {
      this.registration.user.address = new Address(this.addressFormGroup.value);
    }
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
      user: new SystemUser()
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
    this.accountFormGroup = this.formBuilder.group({
      username: [],
      firstName: [],
      lastName: [],
      password: [],
      email: []
    });
    this.addressFormGroup = this.formBuilder.group({
      country: [],
      city: [],
      street: [],
      postalCode: []
    });

  }


}
