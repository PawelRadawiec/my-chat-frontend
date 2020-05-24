import {Injectable} from '@angular/core';
import {Selector, StateContext, Store} from '@ngxs/store';
import {Action, State} from '../../../../node_modules/@ngxs/store';
import {tap, catchError} from 'rxjs/internal/operators';
import {SystemUser} from '../../modules/authentication-module/model/system-user.model';
import {SystemUserService} from '../../service/system-user.service';
import {
  RegistrationRequest,
  SystemUserGetList,
  SystemUserRegistration,
  SystemUserRegistrationFailed,
  SystemUserSearch
} from './system-user.actions';
import {Registration} from '../../modules/authentication-module/model/registration.model';
import {SetErrorMap} from '../error/error.action';


export class SystemUserStateModel {
  users?: SystemUser[] = [];
  navSearchUsers?: SystemUser[] = [];
  registered?: SystemUser;
  registration?: Registration;
  errorMap?: { [key: string]: string; };
}

const DEFAULT_STATE = {
  users: [],
  navSearchUsers: [],
  registered: null,
  registration: null,
  errorMap: null
};

@State<SystemUserStateModel>({
  name: 'systemUser',
  defaults: DEFAULT_STATE
})
@Injectable()
export class SystemUserState {
  constructor(
    private userService: SystemUserService,
    private store: Store
  ) {
  }

  @Selector()
  static getRegistered(state: SystemUserStateModel) {
    return state.registered;
  }

  @Selector()
  static getRegistration(state: SystemUserStateModel) {
    return state.registration;
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

  @Action(RegistrationRequest)
  registrationStep(context: StateContext<SystemUserStateModel>, {request}: RegistrationRequest) {
    return this.userService.registrationRequest(request).pipe(
      tap((response) => {
        console.log('accountStep response: ', response);
        context.patchState({
          registration: response
        });
      }),
      catchError(err =>
        this.store.dispatch(new SetErrorMap(err.error))
      )
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
