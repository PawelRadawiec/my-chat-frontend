import {ChatContent} from './chat-content.model';

export class ChatMessage {
  message: string;
  from: string;
  to: string;
  content?: ChatContent;
  isMessageOwner?: boolean;
}
