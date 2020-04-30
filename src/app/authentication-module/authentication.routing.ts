import {RouterModule, Routes} from '@angular/router';
import {LogoutComponent} from './components/logout/logout.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {ModuleWithProviders} from '@angular/core';


export const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes)
