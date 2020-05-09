import {Store} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import {ChatContent} from '../modules/chat/model/chat-content.model';
import {SystemUserGetList} from '../store/system-user/system-user.actions';
import {SystemUserState} from '../store/system-user/system-user.state';

@Injectable()
export class ChatSystemUserResolver implements Resolve<any> {

  constructor(private store: Store) {

  }

  resolve(route: ActivatedRouteSnapshot): Observable<ChatContent> {
    return this.store.dispatch(new SystemUserGetList()).pipe(
      map(() => this.store.selectSnapshot(SystemUserState))
    );
  }

}
