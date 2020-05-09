import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {ChatContent} from '../modules/chat/model/chat-content.model';
import {ChatContentGetByUsername} from '../store/chat-content/chat-content.actions';
import {ChatContentState} from '../store/chat-content/chat-content.state';



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
