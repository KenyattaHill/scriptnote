import { makeStyles } from '@material-ui/core';
import { ReactNode, useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    '& .react-resizable-handle': {
      display: 'block',
      backgroundColor: '#37414b',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50%',
    },
    '& .react-resizable-handle-s': {
      height: 10,
      width: '100%',
      cursor: 'row-resize',
      backgroundImage:
        "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=')",
    },
    '& .react-resizable-handle-e': {
      height: '100%',
      width: 10,
      minWidth: 10,
      cursor: 'col-resize',
      backgroundImage:
        "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=')",
    },
  },
  horizontal: {
    display: 'flex',
    flexDirection: 'row',
  },
  vertical: {},
}));

interface ResizableProps {
  direction: 'vertical' | 'horizontal';
  children?: ReactNode;
}

export default function Resizable({ direction, children }: ResizableProps) {
  const classes = useStyles();

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth * 0.65);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setInnerWidth(window.innerWidth);
        setInnerHeight(window.innerHeight);
        if (window.innerWidth * 0.65 < width) {
          setWidth(window.innerWidth * 0.65);
        }
      }, 100);
    };

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);

  const resizableProps: ResizableBoxProps =
    direction === 'horizontal'
      ? {
          minConstraints: [innerWidth * 0.2, Infinity],
          maxConstraints: [innerWidth * 0.75, Infinity],
          className: clsx(classes.root, classes.horizontal),
          width,
          height: Infinity,
          resizeHandles: ['e'],
          onResizeStop: (_, data) => {
            setWidth(data.size.width);
          },
        }
      : {
          minConstraints: [Infinity, 24],
          maxConstraints: [Infinity, innerHeight * 0.9],
          className: classes.root,
          width: Infinity,
          height: 300,
          resizeHandles: ['s'],
        };
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
}
