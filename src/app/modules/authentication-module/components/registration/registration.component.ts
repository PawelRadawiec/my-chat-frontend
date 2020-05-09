import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SystemUser} from '../../model/system-user.model';
import {ErrorService} from '../../../../service/error.service';
import {SystemUserRegistration} from '../../../../store/system-user/system-user.actions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  request: SystemUser;
  registrationForm: FormGroup;

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

  initRegistrationForm() {
    this.registrationForm = this.formBuilder.group({
      username: [],
      password: [],
      email: []
    });
  }


}
