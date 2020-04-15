import {SystemUser} from '../../components/nav/nav.component';
import {Action, State} from '../../../../node_modules/@ngxs/store';
import {SystemUserService} from '../../service/system-user.service';
import {SystemUserGetList} from './system-user.actions';
import {Selector, StateContext} from '@ngxs/store';
import {tap} from 'rxjs/internal/operators';


export class SystemUserStateModel {
  users: SystemUser[] = [];
}

@State<SystemUserStateModel>({
  name: 'systemUser',
  defaults: {
    users: []
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

}
