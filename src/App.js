import React, { useEffect, useRef, useState } from 'react';
import Editor from './assets/Components/Editor';
import { TiCodeOutline } from "react-icons/ti"; // Corrected import statement
import { TiArrowMaximise } from "react-icons/ti";

import { FaPython, FaJava } from "react-icons/fa";
import { FaMoon, FaShareFromSquare } from "react-icons/fa6";
import { MdLightMode } from "react-icons/md";
import { HiDownload } from "react-icons/hi";
import { IoStopOutline, IoPlayOutline } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { CiShare1 } from "react-icons/ci";
import { saveAs } from 'file-saver';

import axios from 'axios';
import './App.css'; 

// 
// <TbMinimize />

const App = () => {

  const [langNumber, setLangNumber] = useState(0);
  const [editorContent, setEditorContent] = useState("");
  const [output, setOutput] = useState("");
  const [isDark, setIsDark] = useState(0);
  const fileRef = useRef("");
  const inputRef = useRef("");
  const currentFileNameRef = useRef(""); 
  
  const changeFileName = (number) => {
    if (number === 0) {
      currentFileNameRef.current = "main.cpp";
      fileRef.current.textContent = currentFileNameRef.current;
    }
    else if (number === 1) {
      currentFileNameRef.current = "main.py";
      fileRef.current.textContent = currentFileNameRef.current;
    }
    else {
      currentFileNameRef.current = "main.java";
      fileRef.current.textContent = currentFileNameRef.current;
    }
  }

  const changeLang = (number) => {
    setLangNumber(number);
    window.localStorage.setItem('langNumber', JSON.stringify(number));
    changeFileName(number);
  }

  const handleEditorChang = (newContent) => {
    setEditorContent(newContent);
  }

  const compileCode = async () => {
    const lang = langNumber === 0 ? 'Cpp' : langNumber === 1 ? 'Python' : 'Java';

    try {
      const response = await axios.post(`http://localhost:9000/compile`, {
        code: editorContent,
        input: inputRef.current.value, 
        lang: lang,
      });

      // setOutput(response.data.output)
      console.log(response.data);
    } catch (error) {
      console.error('Error compiling code:', error);
    }
  };

  const setDark = () => {
    document.querySelector("body").setAttribute('theme', 'dark');
    window.localStorage.setItem('theme', JSON.stringify('dark'));
    setIsDark(1);
  }

  const setLight = () => {
    document.querySelector("body").setAttribute('theme', 'light');
    window.localStorage.setItem('theme', JSON.stringify('light'));
    setIsDark(0);
  }

  const downloadFile = () => {
    const blob = new Blob([editorContent], { type: 'text/plain' });
    saveAs(blob, currentFileNameRef.current);
  }


  useEffect (() => {
    try {
      let lstLang = JSON.parse(window.localStorage.getItem('langNumber'));
      let theme = JSON.parse(window.localStorage.getItem('theme'));
      if (!isNaN(lstLang)) {
        changeFileName(lstLang);
        setLangNumber(lstLang);
      }
      if (theme === 'dark')setDark();
    }
    catch {
      console.error("Invalid number retrieved from localStorage");
    }
    document.addEventListener('keydown', (event) => {
      if ((event.key === 's' || event.key === 'S') && (event.ctrlKey || event.metaKey)) {
        // event.preventDefault();
        // downloadFile();
      }
    });
  }, []);
  
  return (
    <div className="App">
      <h1>FlexiCode</h1>
      <div className='container'> 
        <div className='languages'>
          <div className='border'></div>
          <div className={`cpp lang ${langNumber === 0 && 'active'}`}
          onClick={() => changeLang(0)}>
            <TiCodeOutline />
          </div>
          <div className={`py lang ${langNumber === 1 && 'active'}`} 
            onClick={() => changeLang(1)}>
            <FaPython />
          </div>
          <div className={`java lang ${langNumber === 2 && 'active'}`}
            onClick={() => changeLang(2)}>
            <FaJava />
          </div>
          <div className='border'></div>
        </div>
        <div className='code-area'>
          <div className='header'>
            <div className='file-name'>
              <p ref={fileRef}></p>
            </div>
            <div className='control-panel'>
             
              <div>
                <IoPlayOutline className='run' onClick={compileCode}/>
              </div>
              <div>
                <IoStopOutline className='stop'/>
              </div>
              <div>
                <HiDownload onClick={downloadFile} className='download'/>
              </div>
              <div>
                {isDark ? <MdLightMode className='dark-mode' onClick={setLight}/> : 
                  <FaMoon className='light-mode' onClick={setDark}/>}
              </div>
              <div>
                <TiArrowMaximise className='maximize'/>
              </div>
              <div>
                <GrPowerReset className='reset'/>
              </div>
              <div>
                <CiShare1 className='share'/>
              </div>
            </div>
          </div>
          <Editor lang={langNumber} onEditorChange={handleEditorChang} theme={isDark}/>
        </div>
        <div className='input-output-area'>
          <div className='input'>
            <label>Input</label>
            <textarea ref={inputRef}></textarea>
          </div>
          <div className='output'>
            <label>Output</label>
            <textarea readOnly value={output}></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;


