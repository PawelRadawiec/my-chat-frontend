import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { MainComponent } from './components/main/main.component';
import { FotterComponent } from './components/fotter/fotter.component';
import { AppRoutingModule } from './app-routing.module';
import { ChatActivatorComponent } from './components/chat-activator/chat-activator.component';
import { MyChatComponent } from './components/my-chat/my-chat.component';
import { NgxsModule } from '@ngxs/store';
import { ChatContentState } from './store/chat-content.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MyChatComponent,
    HeaderComponent,
    NavComponent,
    MainComponent,
    FotterComponent,
    ChatActivatorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([
      ChatContentState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
