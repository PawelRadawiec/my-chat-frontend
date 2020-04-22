import {ChatContentContacts} from '../../model/chat-content-contacts.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {ContactsService} from '../../service/contacts.service';
import {tap} from 'rxjs/operators';
import {ChatContactByUsername} from './contacts.actions';


export class ChatContactsStateModel {
  chatContact: ChatContentContacts;
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

  @Action(ChatContactByUsername)
  getByUserName({getState, setState}: StateContext<ChatContactsStateModel>, {username}: ChatContactByUsername) {
    const state = getState;
    return this.contactService.getByUsername(username)
      .pipe(tap((result) => {
        console.log('RESULT: ', result);
        setState({
          ...state,
          chatContact: result
        });
      }));
  }


}




