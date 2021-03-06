import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './common/components/header/header.component';
import {MainComponent} from './common/components/main/main.component';
import {FotterComponent} from './common/components/fotter/fotter.component';
import {AppRoutingModule} from './app-routing.module';
import {NgxsModule} from '@ngxs/store';
import {ChatContentState} from './store/chat-content/chat-content.state';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SystemUserState} from './store/system-user/system-user.state';
import {AuthorizationState} from './store/authorization/authorization.state';
import {HttpInterceptorAuthService} from './common/interceptors/http-interceptor-auth.service';
import {ChatContactsState} from './store/contacts/contacts.state';
import {AuthenticationModule} from './modules/authentication-module/authentication.module';
import {ChatModule} from './modules/chat/chat.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FotterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthenticationModule,
    ChatModule,
    NgxsModule.forRoot([
      ChatContentState,
      SystemUserState,
      ChatContactsState,
      AuthorizationState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorAuthService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
