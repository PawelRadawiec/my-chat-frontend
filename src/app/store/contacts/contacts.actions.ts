import { ChatContact } from 'src/app/model/chat-content-contacts.model';


export class GetChatContact {
  static type = '[ChatContacts] ChatContact';

  constructor() {
  }
}

export class AddContact {
    static type = '[ChatContacts] AddContact';
    constructor(public chatContact: ChatContact) {

    }
}
