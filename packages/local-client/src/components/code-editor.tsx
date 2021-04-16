import { Button, makeStyles } from '@material-ui/core';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
// import {emmetJSX, emmetHTML} from 'emmet-monaco-es'
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import Highlighter from 'monaco-jsx-highlighter';

const useJSXStyles = makeStyles(theme => ({
  '@global': {
    '.JSXElement.JSXIdentifier': {
      color: 'lightcoral',
    },

    '.JSXElement.JSXBracket': {
      color: 'grey',
    },

    '.JSXElement.JSXText': {
      color: 'darkkhaki',
    },

    '.JSXElement.JSXGlyph': {
      background: 'cyan',
      opacity: 0.25,
    },

    '.JSXOpeningFragment.JSXBracket': {
      color: 'grey',
      fontWeight: 'bold',
    },

    '.JSXClosingFragment.JSXBracket': {
      color: 'grey',
      fontWeight: 'bold',
    },

    '.JSXOpeningElement.JSXBracket': {
      color: 'grey',
      fontWeight: 'bold',
    },

    '.JSXOpeningElement.JSXIdentifier': {
      color: 'royalblue',
    },

    '.JSXClosingElement.JSXBracket': {
      color: 'grey',
      fontWeight: 'lighter',
    },

    '.JSXClosingElement.JSXIdentifier': {
      color: 'royalblue',
      fontWeight: 'lighter',
    },

    '.JSXAttribute.JSXIdentifier': {
      color: 'steelblue',
    },

    '.JSXExpressionContainer.JSXBracket': {
      color: 'grey',
    },

    '.JSXSpreadChild.JSXBracket': {
      color: 'grey',
    },

    '.JSXSpreadAttribute.JSXBracket': {
      color: 'grey',
    },
  },
}));

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    height: '100%',
    width: 'calc(100% - 10px)',
    '& button': {
      position: 'absolute',
      top: 10,
      right: 20,
      zIndex: 20,
      opacity: 0,
      transition: 'opacity 0.3s',
    },
    '&:hover button': {
      opacity: 1,
    },
  },
}));

const babelParse = (code: string) =>
  parse(code, { sourceType: 'module', plugins: ['jsx'] });

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

export default function CodeEditor({
  onChange,
  initialValue,
}: CodeEditorProps) {
  useJSXStyles();
  const editorRef = useRef<any>();
  const classes = useStyles();
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    // emmetHTML((window as any).monaco);
    // emmetJSX((window as any).monaco);
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
    const highlighter = new Highlighter(
      (window as any).monaco,
      babelParse,
      traverse,
      monacoEditor
    );
    highlighter.highLightOnDidChangeModelContent();
  };

  const onFormatClick = () => {
    const unformatted = editorRef.current.getModel().getValue();

    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    editorRef.current.setValue(formatted);
  };

  return (
    <div className={classes.root}>
      <Button onClick={onFormatClick}>Format</Button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        theme='dark'
        language='javascript'
        height='100%'
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
