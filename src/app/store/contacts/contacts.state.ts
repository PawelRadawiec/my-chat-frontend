import {ChatContact, ChatContentContacts} from '../../model/chat-content-contacts.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {ContactsService} from '../../service/contacts.service';
import {tap} from 'rxjs/operators';
import {GetChatContact, AddContact, SearchContact} from './contacts.actions';
import {ChatContentState} from '../chat-content/chat-content.state';


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




