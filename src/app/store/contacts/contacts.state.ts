import { ChatContentContacts } from '../../model/chat-content-contacts.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ContactsService } from '../../service/contacts.service';
import { tap } from 'rxjs/operators';
import { GetChatContact, AddContact } from './contacts.actions';
import { ChatContentState } from '../chat-content/chat-content.state';


export class ChatContactsStateModel {
  chatContact?: ChatContentContacts;
}

@State<ChatContactsStateModel>({
  name: 'chatContact',
  defaults: {
    chatContact: null
  }
})
export class ChatContactsState {

  constructor(private contactService: ContactsService) {
  }

  @Selector()
  static getChatContact(state: ChatContactsStateModel) {
    return state.chatContact;
  }

  @Action(GetChatContact)
  getByUserName({ getState, setState }: StateContext<ChatContactsStateModel>, { }: GetChatContact) {
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
  addContact({ getState, setState }: StateContext<ChatContactsStateModel>, { chatContact }: AddContact) {
    return this.contactService.addChatCootact(chatContact).pipe(
      tap((contacts) => {
        console.log('contacts: ', contacts);
        setState({
          ...getState
        });
      })
    );
  }



}




