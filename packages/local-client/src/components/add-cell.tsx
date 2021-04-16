import { useActions } from '../hooks';
import { Button, makeStyles } from '@material-ui/core';
import { Code, Comment } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  addCell: {
    position: 'relative',
    opacity: 0,
    transition: 'opacity 0.3s ease-in 0.1s',
    '&:hover': {
      opacity: 0.9,
    },
  },
  forceVisible: {
    opacity: 0.9,
  },
  divider: {
    position: 'absolute',
    top: '50%',
    bottom: '50%',
    left: '2.5%',
    right: '2.5%',
    borderBottom: '1px solid gray',
    width: '95%',
    zIndex: -1,
  },
  addButtons: {
    display: 'flex',
    justifyContent: 'center',
    '& button': {
      margin: '0 30px',
    },
  },
}));

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}
export default function AddCell({
  previousCellId,
  forceVisible,
}: AddCellProps) {
  const classes = useStyles();
  const { insertCellAfter } = useActions();
  return (
    <div
      className={clsx(classes.addCell, {
        [classes.forceVisible]: forceVisible,
      })}>
      <div className={classes.addButtons}>
        <Button
          size='small'
          color='primary'
          variant='contained'
          onClick={() => insertCellAfter(previousCellId, 'code')}>
          <Code />
        </Button>
        <Button
          size='small'
          color='primary'
          variant='contained'
          onClick={() => insertCellAfter(previousCellId, 'text')}>
          <Comment />
        </Button>
      </div>
      <div className={classes.divider}></div>
    </div>
  );
}
