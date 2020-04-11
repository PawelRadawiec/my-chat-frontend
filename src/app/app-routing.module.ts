import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MyChatComponent } from './components/my-chat/my-chat.component';
import { ChatContentResolver } from './resolvers/chat-contnt-resolver';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: MainComponent },
  {
    path: 'chat/:username',
    component: MyChatComponent,
    resolve: {
      activationResolver: ChatContentResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ChatContentResolver]
})

export class AppRoutingModule {
}
