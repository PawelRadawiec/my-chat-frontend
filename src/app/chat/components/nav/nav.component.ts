import {Component, OnDestroy, OnInit} from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {SystemUser} from '../../../authentication-module/model/system-user.model';
import {ChatContact, ChatContentContacts} from '../../model/chat-content-contacts.model';
import {Select, Store} from '@ngxs/store';
import {ChatContactsState} from '../../../store/contacts/contacts.state';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AddContact, SearchContact} from '../../../store/contacts/contacts.actions';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  @Select(ChatContactsState.getChatContact) chatContact$: Observable<ChatContentContacts>;
  //@Select(ChatContactsState.getNavContacts) navContacts$: Observable<ChatContact[]>;

  stompClient;
  // searchForm: FormGroup;
  // searchResult: SystemUser[] = [];
  contacts: ChatContact[] = [];
  chatContact: ChatContentContacts;

  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.chatContact$.subscribe((chatContact) => {
      if (chatContact) {
        this.chatContact = chatContact;
        this.contacts = chatContact.contacts;
        this.sortContacts();
      }
    });
    // this.navContacts$.subscribe((contacts) => {
    //   if (contacts) {
    //     this.searchResult = contacts;
    //   }
    // });
    this.initWebSocketConnection();
    //this.initSearchForm();
  }

  ngOnDestroy() {
  }

  selectContact(contact: ChatContact) {
    this.router.navigate([`chat/${contact.username}`]);
  }

  // initSearchForm() {
  //   this.searchForm = this.formBuilder.group({
  //     username: []
  //   });
  // }

  // search() {
  //   const username = this.searchForm.value.username;
  //   this.store.dispatch(new SearchContact(username));
  // }

  // addContact(contact: ChatContact) {
  //   this.store.dispatch(new AddContact(contact));
  // }

  // get showSearchResult() {
  //   return this.searchResult && this.searchResult.length > 0;
  // }

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


}
