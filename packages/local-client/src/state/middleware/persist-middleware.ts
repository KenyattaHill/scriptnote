import { Dispatch, Middleware } from 'redux';
import { saveCells } from '../action-creators';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { RootState } from '../reducers';

const saveTriggers = [
  ActionType.MOVE_CELL,
  ActionType.DELETE_CELL,
  ActionType.UPDATE_CELL,
  ActionType.INSERT_CELL_AFTER,
];

export const persistMiddleware: Middleware<{}, RootState, Dispatch<Action>> = ({
  dispatch,
  getState,
}) => {
  let timer: any;
  return next => (action: Action) => {
    next(action);
    if (saveTriggers.includes(action.type)) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        saveCells()(dispatch, getState);
      }, 300);
    }
  };
};
