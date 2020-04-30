import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {ChatContentResolver} from './resolvers/chat-contnt-resolver';
import {ChatSystemUserResolver} from './resolvers/chat-system-user.resolver';
import {AuthGuard} from './guards/auth.guard';
import {ChatContactsResolver} from './resolvers/chat-contacts.resolver';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {
    path: 'home',
    resolve: {
      chatContactsResolver: ChatContactsResolver
    },
    canActivate: [AuthGuard],
    component: MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    ChatContentResolver,
    ChatContactsResolver,
    ChatSystemUserResolver
  ]
})

export class AppRoutingModule {
}
