import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ChatContentContacts} from '../model/chat-content-contacts.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getChatContacts() {
    return this.http.get<ChatContentContacts>(`${this.baseUrl}/contacts`);
  }


}
