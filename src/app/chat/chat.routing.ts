import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';
import {ChatContactsResolver} from '../resolvers/chat-contacts.resolver';
import {MyChatComponent} from './components/my-chat/my-chat.component';
import {ChatContentResolver} from '../resolvers/chat-contnt-resolver';
import {ChatSystemUserResolver} from '../resolvers/chat-system-user.resolver';

const routes: Routes = [
  {
    path: 'chat/:username',
    component: MyChatComponent,
    canActivate: [AuthGuard],
    resolve: {
      activationResolver: ChatContentResolver,
      chatContactsResolver: ChatContactsResolver,
      chatUserListResolver: ChatSystemUserResolver
    }
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
