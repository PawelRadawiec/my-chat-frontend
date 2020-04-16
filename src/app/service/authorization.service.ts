import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SystemUser} from '../components/nav/nav.component';


export class TokenResponse {
  token: string;
  user: SystemUser;

}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) {
  }


  authorization(username: string, password: string) {
    const body = {
      username: username,
      password: password
    };
    return this.http.post<TokenResponse>('http://localhost:8080/authenticate', body);
  }


}
