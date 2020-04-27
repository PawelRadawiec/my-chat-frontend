import {Action, State} from '../../../../node_modules/@ngxs/store';
import {SystemUserService} from '../../service/system-user.service';
import {SystemUserGetList, SystemUserRegistration, SystemUserRegistrationFailed, SystemUserSearch} from './system-user.actions';
import {Selector, StateContext} from '@ngxs/store';
import {tap, catchError} from 'rxjs/internal/operators';
import {SystemUser} from '../../model/system-user.model';


export class SystemUserStateModel {
  users?: SystemUser[] = [];
  navSearchUsers?: SystemUser[] = [];
  registered?: SystemUser;
  errorMap?: { [key: string]: string; };
}

@State<SystemUserStateModel>({
  name: 'systemUser',
  defaults: {
    users: [],
    navSearchUsers: [],
    registered: null
  }
})

export class SystemUserState {
  constructor(private userService: SystemUserService) {
  }

  @Selector()
  static getSystemUserList(state: SystemUserStateModel) {
    return state.users;
  }

  @Selector()
  static getNavSearchResult(state: SystemUserStateModel) {
    return state.navSearchUsers;
  }

  @Selector()
  static getErrorMap(state: SystemUserStateModel) {
    return state.errorMap;
  }

  @Action(SystemUserGetList)
  getUserList({getState, setState}: StateContext<SystemUserStateModel>, {}: SystemUserGetList) {
    const state = getState;
    return this.userService.getUserList().pipe(
      tap(((users) => {
        setState({
          ...state,
          users: users
        });
      })));
  }

  @Action(SystemUserRegistration)
  registration(userState: StateContext<SystemUserStateModel>, {request}: SystemUserRegistration) {
    return this.userService.registration(request).pipe(
      tap((response) => {
        userState.setState({
          ...userState.getState,
          registered: response
        });
      }),
      catchError(error => {
        console.log('Error occur: ', error);
        return userState.dispatch(new SystemUserRegistrationFailed(error.error));
      })
    );
  }

  @Action(SystemUserSearch)
  search(userState: StateContext<SystemUserStateModel>, {username}: SystemUserSearch) {
    return this.userService.search(username).pipe(
      tap((result) => {
        userState.setState({
          ...userState.getState,
          navSearchUsers: result
        });
      })
    );
  }

  @Action(SystemUserRegistrationFailed)
  registrationFailed(userState: StateContext<SystemUserStateModel>, {errorMap}: SystemUserRegistrationFailed) {
    userState.setState({
      ...userState.getState,
      errorMap: errorMap
    });
  }


}
