import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ChatContent } from '../model/chat-content.model';

@Injectable({
  providedIn: 'root'
})
export class ChatContentService {

  constructor(private http: HttpClient) { }

  getByUsername(username: string) {
    return this.http.get<ChatContent>(`http://localhost:8080/content/${username}`);
  }


}
