import { SystemUser } from '../../components/nav/nav.component';
import { Action, State } from '../../../../node_modules/@ngxs/store';
import { SystemUserService } from '../../service/system-user.service';
import { SystemUserGetList, SystemUserRegistration } from './system-user.actions';
import { Selector, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/internal/operators';


export class SystemUserStateModel {
  users?: SystemUser[] = [];
  registered?: SystemUser;
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
  registration({ getState, setState }: StateContext<SystemUserStateModel>, { request }: SystemUserRegistration) {
    const state = getState;
    return this.userService.registration(request).pipe(
      tap((response) => {
        setState({
          ...state,
          registered: response
        });
      })
    );
  }


}
