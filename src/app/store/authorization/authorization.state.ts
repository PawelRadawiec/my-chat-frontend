import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {tap} from 'rxjs/internal/operators';
import {SystemUser} from '../../modules/authentication-module/model/system-user.model';
import {AuthorizationService, TokenResponse} from '../../modules/authentication-module/service/authorization.service';
import {GetAuthorization, SetSystemUser, SystemUserLogout} from './authotization.actions';


export class AuthorizationStateModel {
  loggedUser?: SystemUser;
  tokenResponse?: TokenResponse;
  isLogged?: boolean;
}

@State<AuthorizationStateModel>({
  name: 'authState',
  defaults: {
    loggedUser: null,
    tokenResponse: null,
    isLogged: false
  }
})
@Injectable()
export class AuthorizationState {

  constructor(
    private authService: AuthorizationService,
    private router: Router
  ) {

  }

  @Selector()
  static getIsLogged(state: AuthorizationStateModel) {
    return state.isLogged;
  }

  @Selector()
  static getLoggedUser(state: AuthorizationStateModel) {
    return state.loggedUser;
  }

  @Action(GetAuthorization)
  authorization({getState, setState}: StateContext<AuthorizationStateModel>, {login, password}: GetAuthorization) {
    const state = getState;
    return this.authService.authorization(login, password)
      .pipe(
        tap((result) => {
          sessionStorage.setItem('authUser', result.user.username);
          sessionStorage.setItem('token', `Bearer ${result.token}`);
          this.router.navigate([`home`]);
          setState({
            ...state,
            loggedUser: null,
            tokenResponse: result,
            isLogged: true
          });
        })
      );
  }

  @Action(SetSystemUser)
  setSystemUser(authState: StateContext<AuthorizationStateModel>, {user}: SetSystemUser) {
    authState.setState(({
      ...authState.getState,
      loggedUser: user,
      isLogged: true
    }));
  }

  @Action(SystemUserLogout)
  logout(authState: StateContext<AuthorizationStateModel>, {}: SystemUserLogout) {
    return this.authService.logout().pipe(
      tap(() => {
        authState.setState({
          ...authState.getState,
          loggedUser: null,
          isLogged: false
        });
        sessionStorage.removeItem('authUser');
        sessionStorage.removeItem('token');
      })
    );
  }


}
