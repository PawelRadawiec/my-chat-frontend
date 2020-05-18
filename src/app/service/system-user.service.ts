import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RegistrationStep, SystemUser} from '../modules/authentication-module/model/system-user.model';
import {Registration} from '../modules/authentication-module/model/registration.model';

@Injectable({
  providedIn: 'root'
})
export class SystemUserService {
  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  getUserList() {
    return this.http.get<SystemUser[]>(`${this.baseUrl}chat-user/list`);
  }

  registration(request: SystemUser) {
    return this.http.post<SystemUser>(`${this.baseUrl}chat-user/registration`, request);
  }

  search(username: string) {
    return this.http.get<SystemUser[]>(`${this.baseUrl}chat-user/search/${username}`);
  }

  registrationStep(request: SystemUser, step: RegistrationStep) {
    const params = new HttpParams().append('step', step);
    return this.http.post<SystemUser>(`${this.baseUrl}chat-user/registration`, request, {params});
  }

  registrationRequest(request: Registration) {
    return this.http.post<Registration>(`${this.baseUrl}chat-user/registration/step`, request);
  }

  isUserLoggedIn() {
    return sessionStorage.getItem('authUser') !== null;
  }


}
