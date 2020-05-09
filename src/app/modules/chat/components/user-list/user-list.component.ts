import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {SystemUser} from '../../../authentication-module/model/system-user.model';
import {ChatContact} from '../../model/chat-content-contacts.model';
import {AddContact, SearchContact} from '../../../../store/contacts/contacts.actions';
import {ChatContactsState} from '../../../../store/contacts/contacts.state';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  @Select(ChatContactsState.getNavContacts) navContacts$: Observable<ChatContact[]>;

  private subscription: Subscription;
  searchForm: FormGroup;
  searchResult: SystemUser[] = [];

  constructor(
    private store: Store,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.navContacts$.subscribe((contacts) => {
      if (contacts) {
        this.searchResult = contacts;
      }
    });
    this.initSearchForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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


}
