import { ChatContent } from '../../model/chat-content.model';

export class ChatContentCreate {
    static readonly type = '[ChatContent] Create';

    constructor(public request: ChatContent) { }

}

export class ChatContentGetById {
    static readonly type = '[ChatContent] GetById';

    constructor(public id: number) { }
}

export class ChatContentGetByUsername {
    static readonly type = '[ChatContent] GetByUsername';
    constructor(public username: string) { }
}




