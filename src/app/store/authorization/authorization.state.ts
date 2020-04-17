import {SystemUser} from '../../components/nav/nav.component';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AuthorizationService, TokenResponse} from '../../service/authorization.service';
import {GetAuthorization} from './authotization.actions';
import {tap} from 'rxjs/internal/operators';
import {Router} from '@angular/router';


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

  @Action(GetAuthorization)
  authorization({getState, setState}: StateContext<AuthorizationStateModel>, {login, password}: GetAuthorization) {
    const state = getState;
    return this.authService.authorization(login, password)
      .pipe(
        tap((result) => {
          sessionStorage.setItem('authUser', result.user.username);
          sessionStorage.setItem('token', `Bearer ${result.token}`);
          this.router.navigate([`chat/${result.user.username}`]);
          setState({
            ...state,
            loggedUser: null,
            tokenResponse: result,
            isLogged: true
          });
        })
      );
  }


}
