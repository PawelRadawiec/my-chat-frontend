import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SystemUser} from '../model/system-user.model';

@Injectable({
  providedIn: 'root'
})
export class SystemUserService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getUserList() {
    return this.http.get<SystemUser[]>(`${this.baseUrl}/chat-user/list`);
  }

  registration(request: SystemUser) {
    return this.http.post<SystemUser>(`${this.baseUrl}/chat-user/registration`, request);
  }

  isUserLoggedIn() {
    return sessionStorage.getItem('authUser') !== null;
  }


}
