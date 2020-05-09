import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ChatContent} from '../modules/chat/model/chat-content.model';
import {ChatMessage} from '../modules/chat/model/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatContentService {

  constructor(private http: HttpClient) {
  }

  getByUsername(username: string) {
    return this.http.get<ChatContent>(`http://localhost:8080/content/${username}`);
  }

  saveMessage(message: ChatMessage) {
    return this.http.post<ChatContent>(`http://localhost:8080/message/save`, message);
  }


}
