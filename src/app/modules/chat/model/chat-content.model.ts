import {SystemUser} from '../../authentication-module/model/system-user.model';
import {ChatMessage} from './chat-message.model';


export class ChatContent {
    id: number;
    owner: SystemUser;
    correspondent: SystemUser;
    messages: ChatMessage[] = [];
}
