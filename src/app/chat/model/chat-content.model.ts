import { ChatMessage } from './chat-message.model';
import {SystemUser} from '../../authentication-module/model/system-user.model';


export class ChatContent {
    id: number;
    owner: SystemUser;
    messages: ChatMessage[] = [];
}
