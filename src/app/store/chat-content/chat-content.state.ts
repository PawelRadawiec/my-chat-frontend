import { State, Selector, Action, StateContext } from '@ngxs/store';
import { ChatContent } from '../../model/chat-content.model';
import { ChatContentCreate, ChatContentGetByUsername } from './chat-content.actions';
import { ChatContentService } from '../../service/chat-content.service';
import { tap } from 'rxjs/operators';


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

    constructor(private contentService: ChatContentService) { }

    @Selector()
    static getChatContent(state: ChatContentStateModel) {
        return state.chatContent;
    }

    @Action(ChatContentCreate)
    create({ getState, patchState }: StateContext<ChatContentStateModel>, { request }: ChatContentCreate) {
        const state = getState;
        patchState({
            chatContent: request
        });
    }

    @Action(ChatContentGetByUsername)
    getByUserName({ getState, setState }: StateContext<ChatContentStateModel>, { username }: ChatContentGetByUsername) {
        return this.contentService.getByUsername(username)
            .pipe(tap((result) => {
                const state = getState;
                setState({
                    ...state,
                    chatContent: result
                });
            }));
    }


}
