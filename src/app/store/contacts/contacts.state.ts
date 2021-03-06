import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {tap} from 'rxjs/operators';
import {ChatContact, ChatContentContacts} from '../../modules/chat/model/chat-content-contacts.model';
import {ContactsService} from '../../service/contacts.service';
import {AddContact, GetChatContact, SearchContact} from './contacts.actions';



export class ChatContactsStateModel {
  chatContact?: ChatContentContacts;
  navContacts?: ChatContact[];
}

@State<ChatContactsStateModel>({
  name: 'chatContact',
  defaults: {
    chatContact: null,
    navContacts: null
  }
})
@Injectable()
export class ChatContactsState {

  constructor(private contactService: ContactsService) {
  }

  @Selector()
  static getChatContact(state: ChatContactsStateModel) {
    return state.chatContact;
  }

  @Selector()
  static getNavContacts(state: ChatContactsStateModel) {
    return state.navContacts;
  }

  @Action(GetChatContact)
  getByUserName({getState, setState}: StateContext<ChatContactsStateModel>, {}: GetChatContact) {
    const state = getState;
    return this.contactService.getChatContacts()
      .pipe(tap((result) => {
        setState({
          ...state,
          chatContact: result
        });
      }));
  }

  @Action(AddContact)
  addContact(state: StateContext<ChatContactsStateModel>, {chatContact}: AddContact) {
    return this.contactService.addChatCootact(chatContact).pipe(
      tap((contacts) => {
        state.setState({
          ...state.getState,
          chatContact: updateChatContact(state.getState().chatContact, contacts),
          navContacts: state.getState().navContacts
        });
      })
    );
  }

  @Action(SearchContact)
  searchContact(state: StateContext<ChatContactsStateModel>, {username}: SearchContact) {
    return this.contactService.search(username).pipe(
      tap((result) => {
        state.setState({
          ...state.getState,
          chatContact: state.getState().chatContact,
          navContacts: result
        });
      })
    );
  }


}

function updateChatContact(chatContentContacts: ChatContentContacts, contacts: ChatContact[]): ChatContentContacts {
  return {
    id: chatContentContacts.id,
    owner: chatContentContacts.owner,
    contacts: contacts
  };
}




