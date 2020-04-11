import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { ChatContentGetByUsername } from '../store/chat-content.actions';
import { ChatContent } from '../model/chat-content.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatContentState } from '../store/chat-content.state';


@Injectable()
export class ChatContentResolver implements Resolve<any> {

    constructor(private store: Store) { }

    resolve(route: ActivatedRouteSnapshot): Observable<ChatContent> {
        const username = route.params.username;
        return this.store.dispatch(new ChatContentGetByUsername(username)).pipe(
            map(() => this.store.selectSnapshot(ChatContentState))
        );
    }

}
