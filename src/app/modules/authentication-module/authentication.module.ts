import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {routing} from './authentication.routing';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    RegistrationComponent
  ],
  exports: [
    LoginComponent,
    LogoutComponent,
    RegistrationComponent
  ]
})
export class AuthenticationModule {
}
