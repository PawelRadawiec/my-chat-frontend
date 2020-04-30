import {ChatContent} from '../../chat/model/chat-content.model';
import {ChatMessage} from '../../chat/model/chat-message.model';

export class ChatContentCreate {
  static readonly type = '[ChatContent] Create';

  constructor(public request: ChatContent) {
  }

}

export class ChatContentGetById {
  static readonly type = '[ChatContent] GetById';

  constructor(public id: number) {
  }
}

export class ChatContentGetByUsername {
  static readonly type = '[ChatContent] GetByUsername';

  constructor(public username: string) {
  }
}

export class ChatContentSaveReceivedMessage {
  static readonly type = '[ChatContent] SaveReceivedMessage';

  constructor(public chatMessage: ChatMessage) {
  }
}




