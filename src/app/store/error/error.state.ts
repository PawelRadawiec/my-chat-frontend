import {Action, Selector, State, StateContext} from '@ngxs/store';
import {SetErrorMap} from './error.action';

export class ErrorStateModel {
  errorMap: { [key: string]: string };
}

const DEFAULT_STATE = {
  errorMap: null
};

@State<ErrorStateModel>({
  name: 'error',
  defaults: DEFAULT_STATE
})
export class ErrorState {

  @Selector()
  static getErrors(state: ErrorStateModel) {
    return state.errorMap;
  }

  @Action(SetErrorMap)
  setErrorMap(context: StateContext<ErrorStateModel>, action: SetErrorMap) {
    context.setState(({
      ...context.getState,
      errorMap: action.errorMap
    }));
  }

}
