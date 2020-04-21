import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SystemUser} from '../nav/nav.component';
import {SystemUserRegistration} from 'src/app/store/system-user/system-user.actions';
import {ErrorService} from '../../service/error.service';

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
    this.request = new SystemUser();
    this.initRegistrationForm();
  }

  onSubmit() {
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
