import {State, Selector, Action, StateContext} from '@ngxs/store';
import {ChatContent} from '../../chat/model/chat-content.model';
import {ChatContentCreate, ChatContentGetByUsername, ChatContentSaveReceivedMessage} from './chat-content.actions';
import {ChatContentService} from '../../service/chat-content.service';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';


export class ChatContentStateModel {
  chatContent: ChatContent;
}

@State<ChatContentStateModel>({
  name: 'chatContent',
  defaults: {
    chatContent: null
  }
})
@Injectable()
export class ChatContentState {

  constructor(private contentService: ChatContentService) {
  }

  @Selector()
  static getChatContent(state: ChatContentStateModel) {
    return state.chatContent;
  }

  @Action(ChatContentCreate)
  create({getState, patchState}: StateContext<ChatContentStateModel>, {request}: ChatContentCreate) {
    patchState({
      chatContent: request
    });
  }

  @Action(ChatContentGetByUsername)
  getByUserName({getState, setState}: StateContext<ChatContentStateModel>, {username}: ChatContentGetByUsername) {
    return this.contentService.getByUsername(username)
      .pipe(tap((result) => {
        setState({
          ...getState,
          chatContent: result
        });
      }));
  }

  @Action(ChatContentSaveReceivedMessage)
  saveReceivedMessage({getState, setState}: StateContext<ChatContentStateModel>, {chatMessage}: ChatContentSaveReceivedMessage) {
    return this.contentService.saveMessage(chatMessage)
      .pipe(tap((result) => {
        console.log('message saved: ', result);
      }));
  }


}
