import { makeStyles } from '@material-ui/core';
import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
  bundleError: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    height: '100%',
    flexGrow: 1,
    '.react-draggable-transparent-selection &:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      opacity: 0,
    },
  },
  iframe: {
    height: '100%',
    width: '100%',
  },
  error: {
    position: 'absolute',
    top: 5,
    left: 5,
    color: 'red',
  },
}));

const iFrameHtml = `
    <html>

    
      <head>
        <style>
          html {
            background-color: white;
          }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script>
        const handleError = err => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
          console.error(err);
        }
        window.addEventListener('error', event => {
          event.preventDefault();
          handleError(event.error);
        })
        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (err) {
            handleError(err)
          }
        }, false);
        </script>
      </body>
    </html>
  `;

export default function Preview({ code, bundleError }: PreviewProps) {
  const iframe = useRef<any>();
  const classes = useStyles();

  useEffect(() => {
    iframe.current.srcdoc = iFrameHtml;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);
  return (
    <div className={classes.root}>
      <iframe
        className={classes.iframe}
        title='preview'
        ref={iframe}
        sandbox='allow-scripts allow-modals'
        srcDoc={iFrameHtml}
      />
      {bundleError && <div className={classes.error}>{bundleError}</div>}
    </div>
  );
}
