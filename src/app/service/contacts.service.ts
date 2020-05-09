import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ChatContact, ChatContentContacts} from '../modules/chat/model/chat-content-contacts.model';


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

  addChatCootact(chatContact: ChatContact) {
    return this.http.post<ChatContact[]>(`${this.baseUrl}/contacts/add/contact`, chatContact);
  }

  search(username: string) {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.http.get<ChatContact[]>(`${this.baseUrl}/contacts/search`, {params: params});
  }


}
