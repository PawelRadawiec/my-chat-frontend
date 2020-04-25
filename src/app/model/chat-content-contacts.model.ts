import {SystemUser} from './system-user.model';

export class ChatContentContacts {
  id: number;
  owner: SystemUser;
  contacts: ChatContact[] = [];
}

export class ChatContact {
  id?: number;
  username: string;
  active?: boolean;
}
