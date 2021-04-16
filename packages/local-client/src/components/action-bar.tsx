import { makeStyles, ButtonGroup, Button } from '@material-ui/core';
import { Delete, ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { useActions } from '../hooks';

const useStyles = makeStyles(theme => ({
  actionBar: {
    position: 'absolute',
    top: 0,
    right: 0,
    opacity: .25,
    transition: 'opacity 0.3s',
    '&:hover':{
      opacity: .9
    }
  }
}));

interface ActionBarProps {
  id: string;
}
export default function ActionBar({ id }: ActionBarProps) {
  const classes = useStyles();
  const { moveCell, deleteCell } = useActions();
  return (
    <div className={classes.actionBar}>
      <ButtonGroup color='primary' variant='contained' size='small'>
        <Button onClick={() => moveCell(id, 'up')}>
          <ArrowUpward />
        </Button>
        <Button onClick={() => moveCell(id, 'down')}>
          <ArrowDownward />
        </Button>
        <Button onClick={() => deleteCell(id)}>
          <Delete />
        </Button>
      </ButtonGroup>
    </div>
  );
}
