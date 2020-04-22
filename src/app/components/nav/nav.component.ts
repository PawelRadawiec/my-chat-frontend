import {Component, OnInit} from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {SystemUser} from '../../model/system-user.model';
import {ChatContact, ChatContentContacts} from '../../model/chat-content-contacts.model';
import {Select} from '@ngxs/store';
import {ChatContactsState} from '../../store/contacts/contacts.state';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Select(ChatContactsState.getChatContact) chatContact$: Observable<ChatContentContacts>;

  stompClient;
  systemUserList: SystemUser[] = [];
  chatContact: ChatContentContacts;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.chatContact$.subscribe((chatContact) => {
      if (chatContact) {
        this.chatContact = chatContact;
      }
    });
    this.initWebSocketConnection();
  }

  selectContact(contact: ChatContact) {
    this.router.navigate([`chat/${contact.username}`]);
  }

  initWebSocketConnection() {
    const ws = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, () => {
      that.openSocket();
    });
  }

  openSocket() {
    this.stompClient.subscribe('/topic/users', (systemUser) => {
      this.handleResult(systemUser);
    });
  }

  handleResult(user) {
    if (user) {
      const systemUser: SystemUser = JSON.parse(user.body);
      this.systemUserList.push(systemUser);
    }
  }


}
