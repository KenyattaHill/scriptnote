import { makeStyles } from '@material-ui/core';
import { Cell } from '../state';
import ActionBar from './action-bar';
import CodeCell from './code-cell';
import TextEditor from './text-editor';

const useStyles = makeStyles(theme => ({
  item: {
    position: 'relative',
    margin: '30px 10px',
  },
  actionBarWrapper: {
    width: '100%',
    height: 50,
    backgroundColor: '#37414b',
  },
}));

interface CellListItemProps {
  cell: Cell;
}
export default function CellListItem({ cell }: CellListItemProps) {
  const classes = useStyles();
  return (
    <div className={classes.item}>
      {cell.type === 'code' ? (
        <>
          <div className={classes.actionBarWrapper}>
            <ActionBar id={cell.id} />
          </div>
          <CodeCell cell={cell} />
        </>
      ) : (
        <>
          <TextEditor cell={cell} />
          <ActionBar id={cell.id} />
        </>
      )}
    </div>
  );
}
