import {State, Selector, Action, StateContext} from '@ngxs/store';
import { ChatContent } from '../model/chat-content.model';
import { ChatContentCreate } from './chat-content.actions';


export class ChatContentStateModel {
    chatContent: ChatContent;
}

@State<ChatContentStateModel>({
    name: 'chatContent',
    defaults: {
        chatContent: null
    }
})

export class ChatContentState {

    @Selector()
    static getChatContent(state: ChatContentStateModel) {
        return state.chatContent;
    }

    @Action(ChatContentCreate)
    create({getState, patchState}: StateContext<ChatContentStateModel>, {request}: ChatContentCreate) {
        const state = getState;
        patchState({
            chatContent: request
        });
    }


}
