import { CircularProgress, makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '../hooks';
import useCumulativeCode from '../hooks/use-cumulative-code';
import { Cell } from '../state';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';

const useStyles = makeStyles(theme => ({
  codeCell: {
    height: 'calc(100% - 10px)',
    display: 'flex',
    flexDirection: 'row',
  },
  previewWrapper: {
    height: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.common.white,
  },
  progress: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    animation: '$fadeIn 0.5s',
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '50%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
}));
interface CodeCellProps {
  cell: Cell;
}
export default function CodeCell({ cell: { id, content } }: CodeCellProps) {
  const classes = useStyles();
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector(state => state.bundles[id]);
  const cumulativeCode = useCumulativeCode(id);

  useEffect(() => {
    if (!bundle) {
      createBundle(id, cumulativeCode);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(id, cumulativeCode);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, id, createBundle]);

  return (
    <Resizable direction='vertical'>
      <div className={classes.codeCell}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={content}
            onChange={input => updateCell(id, input)}
          />
        </Resizable>
        <div className={classes.previewWrapper}>
          {!bundle || bundle.isBundling ? (
            <div className={classes.progress}>
              <CircularProgress />
            </div>
          ) : (
            <Preview code={bundle.code} bundleError={bundle.error} />
          )}
        </div>
      </div>
    </Resizable>
  );
}
