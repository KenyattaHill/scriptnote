import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
interface BundleState {
  [key: string]: {
    isBundling: boolean;
    code: string;
    error: string;
  } | undefined;
}
const initialState: BundleState = {};

const reducer = produce((state: BundleState, action: Action) => {
  switch (action.type) {
    case ActionType.BUNDLE_START:
      state[action.payload.cellId] = {
        isBundling: true,
        code: '',
        error: '',
      };
      break;
    case ActionType.BUNDLE_COMPLETE:
      state[action.payload.cellId] = {
        isBundling: false,
        code: action.payload.bundle.code,
        error: action.payload.bundle.error,
      };
      break;
    default:
      break;
  }
}, initialState);

export default reducer;
