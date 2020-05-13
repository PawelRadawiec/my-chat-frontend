import {Injectable} from '@angular/core';
import {Selector, StateContext} from '@ngxs/store';
import {Action, State} from '../../../../node_modules/@ngxs/store';
import {tap, catchError} from 'rxjs/internal/operators';
import {RegistrationStep, SystemUser} from '../../modules/authentication-module/model/system-user.model';
import {SystemUserService} from '../../service/system-user.service';
import {
  RegistrationAccountStep, RegistrationAddressStep,
  SystemUserGetList,
  SystemUserRegistration,
  SystemUserRegistrationFailed,
  SystemUserSearch
} from './system-user.actions';


export class SystemUserStateModel {
  users?: SystemUser[] = [];
  navSearchUsers?: SystemUser[] = [];
  registered?: SystemUser;
  nextStep?: RegistrationStep;
  previousStep?: RegistrationStep;
  errorMap?: { [key: string]: string; };
}

const DEFAULT_STATE = {
  users: [],
  navSearchUsers: [],
  nextStep: null,
  previousStep: null,
  registered: null,
  errorMap: null
};

@State<SystemUserStateModel>({
  name: 'systemUser',
  defaults: DEFAULT_STATE
})
@Injectable()
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

  @Action(RegistrationAccountStep)
  accountStep(context: StateContext<SystemUserStateModel>, {systemUser}: RegistrationAccountStep) {
    return this.userService.registrationStep(systemUser, RegistrationStep.ACCOUNT).pipe(
      tap((response) => {
        context.patchState({
          registered: response,
          nextStep: RegistrationStep.ADDRESS,
          previousStep: RegistrationStep.ACCOUNT
        });
      })
    );
  }

  @Action(RegistrationAddressStep)
  addressStep(context: StateContext<SystemUserStateModel>, {systemUser}: RegistrationAddressStep) {
    return this.userService.registrationStep(systemUser, RegistrationStep.ADDRESS).pipe(
      tap((response) => {
        context.patchState({
          registered: response,
          nextStep: RegistrationStep.ACTIVATION,
          previousStep: RegistrationStep.ADDRESS
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
