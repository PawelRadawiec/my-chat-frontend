import {Component, OnDestroy, OnInit} from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {SystemUser} from '../../model/system-user.model';
import {ChatContact, ChatContentContacts} from '../../model/chat-content-contacts.model';
import {Select, Store} from '@ngxs/store';
import {ChatContactsState} from '../../store/contacts/contacts.state';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AddContact, SearchContact} from '../../store/contacts/contacts.actions';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  @Select(ChatContactsState.getChatContact) chatContact$: Observable<ChatContentContacts>;
  @Select(ChatContactsState.getNavSearchContacts) searchResult$: Observable<ChatContact[]>;

  stompClient;
  searchForm: FormGroup;
  searchResult: SystemUser[] = [];
  systemUserList: SystemUser[] = [];
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
      }
    });
    this.searchResult$.subscribe((searchResult) => {
      if (searchResult) {
        this.searchResult = searchResult;
      }
    });
    this.initWebSocketConnection();
    this.initSearchForm();
  }

  ngOnDestroy() {
  }

  selectContact(contact: ChatContact) {
    this.router.navigate([`chat/${contact.username}`]);
  }

  initSearchForm() {
    this.searchForm = this.formBuilder.group({
      username: []
    });
  }

  search() {
    const username = this.searchForm.value.username;
    this.store.dispatch(new SearchContact(username));
  }

  addContact(contact: ChatContact) {
    this.store.dispatch(new AddContact(contact));
  }

  get showSearchResult() {
    return this.searchResult && this.searchResult.length > 0;
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
