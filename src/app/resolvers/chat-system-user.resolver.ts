import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Injectable} from '@angular/core';
import {ChatContent} from '../model/chat-content.model';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {SystemUserGetList} from '../store/system-user/system-user.actions';
import {map} from 'rxjs/internal/operators';
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
