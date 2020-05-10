import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './common/components/main/main.component';
import {ChatContentResolver} from './common/resolvers/chat-contnt-resolver';
import {ChatSystemUserResolver} from './common/resolvers/chat-system-user.resolver';
import {AuthGuard} from './common/guards/auth.guard';
import {ChatContactsResolver} from './common/resolvers/chat-contacts.resolver';


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
