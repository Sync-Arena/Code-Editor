import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/clike/clike.js';
import 'codemirror/addon/edit/closebrackets.js';

const Editor = () => {
  const editorContainerRef = useRef(null);
  const editorInstanceRef = useRef(null);

  const handleResize = () => {
    if (editorInstanceRef.current) {
      const width = window.innerWidth;
      editorInstanceRef.current.setSize(0.7 * width, 500);
    }
  };

  useEffect(() => {
    if (!editorInstanceRef.current) {
      const editor = CodeMirror(editorContainerRef.current, {
        mode: 'text/x-c++src',
        theme: 'dracula',
        lineNumbers: true,
        autoCloseBrackets: true,
      });
      editorInstanceRef.current = editor;
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      }
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  return (
    <div className="Editor">
      <div ref={editorContainerRef} className="code-area"></div>
    </div>
  );
};

export default Editor;
