import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SystemUser} from '../components/nav/nav.component';

@Injectable({
  providedIn: 'root'
})
export class SystemUserService {

  constructor(private http: HttpClient) {
  }

  getUserList() {
    return this.http.get<SystemUser[]>(`http://localhost:8080/chat-system-user/list`);
  }

}
