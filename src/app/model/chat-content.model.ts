import { ChatMessage } from './chat-message.model';
import {SystemUser} from './system-user.model';


export class ChatContent {
    id: number;
    owner: SystemUser;
    messages: ChatMessage[] = [];
}
