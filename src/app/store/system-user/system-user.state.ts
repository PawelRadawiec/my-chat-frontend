import { SystemUser } from '../../components/nav/nav.component';
import { Action, State } from '../../../../node_modules/@ngxs/store';
import { SystemUserService } from '../../service/system-user.service';
import { SystemUserGetList, SystemUserRegistration, SystemUserRegistrationFailed } from './system-user.actions';
import { Selector, StateContext } from '@ngxs/store';
import { tap, catchError } from 'rxjs/internal/operators';


export class SystemUserStateModel {
  users?: SystemUser[] = [];
  registered?: SystemUser;
  errorMap?: { [key: string]: string; }
}

@State<SystemUserStateModel>({
  name: 'systemUser',
  defaults: {
    users: [],
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

  @Action(SystemUserGetList)
  getUserList({ getState, setState }: StateContext<SystemUserStateModel>, { }: SystemUserGetList) {
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
  registration(userState: StateContext<SystemUserStateModel>, { request }: SystemUserRegistration) {
    return this.userService.registration(request).pipe(
      tap((response) => {
        userState.setState({
          ...userState.getState,
          registered: response
        });
      }),
      catchError(error => {
        console.log('Error occured: ', error);
        return userState.dispatch(new SystemUserRegistrationFailed(error.error));
      })
    );
  }

  @Action(SystemUserRegistrationFailed)
  registrationFailed(userState: StateContext<SystemUserStateModel>, { errorMap }: SystemUserRegistrationFailed) {
    userState.setState({
      ...userState.getState,
      errorMap: errorMap
    });
  }


}
