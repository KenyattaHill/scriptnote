import { Dispatch } from 'redux';
import bundle from '../../bundler';
import { ActionType } from '../action-types';
import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  Action,
} from '../actions';
import { Cell, CellTypes } from '../cell';
import { Direction } from '../direction';
import axios from 'axios';
import { RootState } from '../reducers';

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const createBundle = (cellId: string, rawCode: string) => async (
  dispatch: Dispatch<Action>
) => {
  dispatch({
    type: ActionType.BUNDLE_START,
    payload: {
      cellId,
    },
  });

  const result = await bundle(rawCode);

  dispatch({
    type: ActionType.BUNDLE_COMPLETE,
    payload: {
      cellId,
      bundle: result,
    },
  });
};

export const fetchCells = () => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.FETCH_CELLS });
  try {
    const { data } = await axios.get<Cell[]>('/cells');

    dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: data });
  } catch (error) {
    dispatch({ type: ActionType.FETCH_CELLS_ERROR, payload: error.message });
  }
};

export const saveCells = () => async (
  dispatch: Dispatch<Action>,
  getState: () => RootState
) => {
  const {
    cells: { data, order },
  } = getState();

  const cells = order.map(id => data[id]);

  try {
    await axios.post('/cells', { cells });
  } catch (error) {
    dispatch({ type: ActionType.SAVE_CELLS_ERROR, payload: error.message });
  }
};
