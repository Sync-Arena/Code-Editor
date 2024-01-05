import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/juejin.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/clike/clike.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/anyword-hint';

const Editor = (props) => {
  const editorContainerRef = useRef(null);
  const editorInstanceRef = useRef(null);

  const handleResize = () => {
    if (editorInstanceRef.current) {
      editorInstanceRef.current.setSize('calc(65 * vw)', 'calc(90vh - 60px)');
    }
  };

  useEffect(() => {
    let mode = 'text/plain'; // Default mode
  
    switch (props.lang) {
      case 0:
        mode = 'text/x-c++src';
        break;
      case 1:
        mode = 'text/x-python';
        break;
      case 2:
        mode = 'text/x-java';
        break;
    }
  
    const theme = props.theme === 1 ? 'dracula' : 'juejin';
  
    if (!editorInstanceRef.current) {
      const editor = CodeMirror(editorContainerRef.current, {
        mode: mode,
        theme: theme,
        lineNumbers: true,
        autoCloseBrackets: true,
      });
  
      editor.setOption('hintOptions', {
        hint: CodeMirror.hint.anyword,
        completeSingle: false,
      });
  
      editorInstanceRef.current = editor;
  
      const isLetter = (ch) => /^[a-zA-Z]+$/.test(ch);
  
      editor.on('change', (cm, change) => {
        const cursor = cm.getCursor();
        const lineContent = cm.getLine(cursor.line);
  
        // Check if the change involves typing a letter
        if (change.text.length === 1 && isLetter(change.text[0])) {
          // Trigger auto-completion
          CodeMirror.commands.autocomplete(cm, null, { completeSingle: false });
        }
  
        props.onEditorChange(editorInstanceRef.current.getValue());
      });
  
      handleResize();
      window.addEventListener('resize', handleResize);
    } else {
      // Update mode and theme dynamically
      editorInstanceRef.current.setOption('mode', mode);
      editorInstanceRef.current.setOption('theme', theme);
    }
  }, [props.lang, props.theme]);
  

  return (
    <div className="Editor">
      <div ref={editorContainerRef}></div>
    </div>
  );
};

export default Editor;
