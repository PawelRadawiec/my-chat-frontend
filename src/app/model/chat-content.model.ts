import { SystemUser } from '../components/nav/nav.component';
import { ChatMessage } from './chat-message.model';


export class ChatContent {
    id: number;
    owner: SystemUser;
    messages: ChatMessage[] = [];
}
