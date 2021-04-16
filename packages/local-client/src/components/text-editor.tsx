import { Card, CardContent, makeStyles } from '@material-ui/core';
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useRef, useState } from 'react';
import { useActions } from '../hooks';
import { Cell } from '../state';

const useStyles = makeStyles(theme => ({
  '@global': {
    '.w-md-editor ul': {
      lineHeight: '1',
    },
    '.w-md-editor .title': {
      color: '#d4d4d4',
    },
  },
  textEditor: {
    '& .w-md-editor-bar svg': {
      display: 'none',
    },
    '& .w-md-editor-bar': {
      backgroundImage:
        "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=')",
      height: 11,
      width: '100%',
      cursor: 'row-resize',
      backgroundPosition: '50%',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#37414b',
      position: 'relative',
    },
    '& em': {
      fontStyle: 'italic',
    },
    '& .wmde-markdown hr': {
      borderTop: '1px solid #dee5ed',
    },
    '& .wmde-markdown ol': {
      listStyle: 'decimal',
    },
    '& .w-md-editor-show-live': {
      zIndex: 20,
    },
    '& .w-md-editor-toolbar': {
      backgroundColor: '#37414b',
      borderBottom: '1px solid gray',
    },
    '& .w-md-editor-toolbar li button': {
      color: '#d4d4d4',
    },
    '& .w-md-editor-content': {
      backgroundColor: '#202123',
    },
    '& .w-md-editor,& .w-md-editor .w-md-editor-text-pre': {
      color: '#d4d4d4',
    },
    '& .w-md-editor-text-pre .bold': {
      // color: 'unset',
    },
    '& .token.list.punctuation': {
      backgroundColor: 'unset',
    },
  },
}));

interface TextEditorProps {
  cell: Cell;
}
export default function TextEditor({ cell: { content, id } }: TextEditorProps) {
  const classes = useStyles();
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        !ref.current.contains(event.target as Node)
      ) {
        setEditing(false);
      }
    };

    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className={classes.textEditor} ref={ref}>
        <MDEditor
          value={content}
          onChange={value => updateCell(id, value || '')}
        />
      </div>
    );
  }
  return (
    <Card className={classes.textEditor} onClick={() => setEditing(true)}>
      <CardContent>
        <MDEditor.Markdown source={content || 'Click to Edit'} />
      </CardContent>
    </Card>
  );
}
