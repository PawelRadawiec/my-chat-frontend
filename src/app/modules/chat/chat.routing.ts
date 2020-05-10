import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyChatComponent} from './components/my-chat/my-chat.component';
import {ChatContentResolver} from '../../common/resolvers/chat-contnt-resolver';
import {ChatContactsResolver} from '../../common/resolvers/chat-contacts.resolver';
import {ChatSystemUserResolver} from '../../common/resolvers/chat-system-user.resolver';
import {AuthGuard} from '../../common/guards/auth.guard';

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
