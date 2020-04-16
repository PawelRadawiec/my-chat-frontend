import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {MyChatComponent} from './components/my-chat/my-chat.component';
import {ChatContentResolver} from './resolvers/chat-contnt-resolver';
import {ChatSystemUserResolver} from './resolvers/chat-system-user.resolver';
import {LoginComponent} from './components/login/login.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'chat/:username',
    component: MyChatComponent,
    resolve: {
      activationResolver: ChatContentResolver,
      chatUserListResolver: ChatSystemUserResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    ChatContentResolver,
    ChatSystemUserResolver
  ]
})

export class AppRoutingModule {
}
