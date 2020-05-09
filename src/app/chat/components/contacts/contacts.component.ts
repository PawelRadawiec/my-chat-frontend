import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Select} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {ChatContactsState} from '../../../store/contacts/contacts.state';
import {ChatContact, ChatContentContacts} from '../../model/chat-content-contacts.model';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {
  @Select(ChatContactsState.getChatContact) chatContact$: Observable<ChatContentContacts>;

  private subscription: Subscription;
  stompClient;
  contacts: ChatContact[] = [];
  chatContact: ChatContentContacts;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
    this.subscription = this.chatContact$.subscribe((chatContact) => {
      if (chatContact) {
        this.chatContact = chatContact;
        this.contacts = chatContact.contacts;
        this.sortContacts();
      }
    });
    this.initWebSocketConnection();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  handleResult(result) {
    if (result) {
      const contact: ChatContact = JSON.parse(result.body);
      this.contacts = this.contacts.filter(c => c.username !== contact.username);
      this.sortContacts();
      this.contacts.push(contact);
    }
  }

  sortContacts() {
    this.contacts = this.contacts.sort((c1, c2) => c1.active === c2.active ? 1 : -1);
  }

  getContactBadge(contact: ChatContact) {
    if (!contact) {
      return;
    }
    return contact.active ? 'info' : 'danger';
  }

  getContactStatusLabel(contact: ChatContact) {
    if (!contact) {
      return;
    }
    return contact.active ? 'active' : 'logout';
  }


}
