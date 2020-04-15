import {ChatContent} from '../../model/chat-content.model';
import {ChatMessage} from '../../model/chat-message.model';

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

export class ChatContentSaveRecivedMessage {
  static readonly type = '[ChatContent] SaveRecivedMessage';

  constructor(public chatMessage: ChatMessage) {
  }
}




