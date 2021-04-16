import { makeStyles } from '@material-ui/core';
import { Fragment, useEffect } from 'react';
import { useActions, useTypedSelector } from '../hooks';
import AddCell from './add-cell';
import CellListItem from './cell-list-item';
const useStyles = makeStyles(theme => ({
  cellList: {
    margin: '10px 25px'
  },
  '.react-draggable-transparent-selection &':{
    marginBottom: '100vh'
  }
}))



export default function CellList() {
  const classes = useStyles()
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map(id => data[id])
  );
  const {fetchCells} = useActions()

  useEffect(()=>{
    fetchCells()
  }, [fetchCells])

  const renderedCells = cells.map(cell => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));
  return (
    <div className={classes.cellList}>
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
}
