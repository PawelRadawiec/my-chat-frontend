import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { SystemUser } from '../components/nav/nav.component';
import { ChatContentCreate, ChatContentGetByUsername } from '../store/chat-content.actions';
import { ChatContent } from '../model/chat-content.model';


@Injectable()
export class ChatContentResolver implements Resolve<any> {

    constructor(private store: Store) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const username = route.params.username;
        this.store.dispatch(new ChatContentGetByUsername(username));
    }

}
