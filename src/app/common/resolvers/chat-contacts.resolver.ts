import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ChatContent} from '../../modules/chat/model/chat-content.model';
import {GetChatContact} from '../../store/contacts/contacts.actions';
import {ChatContactsState} from '../../store/contacts/contacts.state';


@Injectable()
export class ChatContactsResolver implements Resolve<any> {

  constructor(private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ChatContent> {
    return this.store.dispatch(new GetChatContact()).pipe(
      map(() => this.store.selectSnapshot(ChatContactsState))
    );
  }


}
