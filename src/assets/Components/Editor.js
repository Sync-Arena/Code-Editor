// Editor.js
import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/clike/clike.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/anyword-hint';

const Editor = (props) => {
  let mode;

  if (props.lang === 0) {
    mode = 'text/x-c++src';
  } else if (props.lang === 1) {
    mode = 'text/x-python';
  } else if (props.lang === 2) {
    mode = 'text/x-java';
  }

  const editorContainerRef = useRef(null);
  const editorInstanceRef = useRef(null);

  const handleResize = () => {
    if (editorInstanceRef.current) {
      const width = window.innerWidth;
      editorInstanceRef.current.setSize('calc(65 * vw)', 'calc(90vh - 60px)');
    }
  };

  useEffect(() => {
    if (!editorInstanceRef.current) {
      const editor = CodeMirror(editorContainerRef.current, {
        mode: mode,
        theme: 'dracula',
        lineNumbers: true,
        autoCloseBrackets: true,
        extraKeys: { 'Ctrl-Space': 'autocomplete' },
      });

      
      editor.setOption('hintOptions', {
        hint: CodeMirror.hint.anyword,
        completeSingle: false,
      });
      
      editorInstanceRef.current = editor;

      editor.on('change', () => {
        props.onEditorChange(editorInstanceRef.current.getValue())
      });
      handleResize();
      window.addEventListener('resize', handleResize);
    }
  }, [mode]);

  return (
    <div className="Editor">
      <div ref={editorContainerRef}></div>
    </div>
  );
};

export default Editor;
