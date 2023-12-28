import React, { useEffect, useRef, useState } from 'react';
import Editor from './assets/Components/Editor';
import { TbBrandCpp, TbMaximize } from "react-icons/tb";
import { FaPython, FaJava } from "react-icons/fa";
import { MdLightMode, MdNightlightRound } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { HiDownload } from "react-icons/hi";
import { VscDebugStart } from "react-icons/vsc";
import axios from 'axios';
import './App.css'; 


// <MdNightlightRound />
// <TbMinimize />

const App = () => {

  const [langNumber, setLangNumber] = useState(0);
  const [editorContent, setEditorContent] = useState("");
  const [output, setOutput] = useState("");
  const fileRef = useRef("");
  const inputRef = useRef("");
  
  const changeFileName = (number) => {
    if (number === 0) {
      fileRef.current.textContent = "main.cpp";
    }
    else if (number === 1) {
      fileRef.current.textContent = "main.py";
    }
    else {
      fileRef.current.textContent = "main.java";
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

      setOutput(response.data.output)
    } catch (error) {
      console.error('Error compiling code:', error);
    }
  };

  useEffect (() => {
    try {
      let lstLang = JSON.parse(window.localStorage.getItem('langNumber'));
      if (!isNaN(lstLang)) {
        changeFileName(lstLang);
        setLangNumber(lstLang);
      }
    }
    catch {
      console.error("Invalid number retrieved from localStorage");
    }
  }, []);

  return (
    <div className="App">
      <h1>FlexiCode</h1>
      <div className='container'> 
        <div className='languages'>
          <div className='border'></div>
          <div className={`cpp lang ${langNumber === 0 && 'active'}`}
          onClick={() => changeLang(0)}>
            <TbBrandCpp />
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
                <VscDebugStart className='run' onClick={compileCode}/>
              </div>
              <div>
                <IoIosSave className='save'/>
              </div>
              <div>
                <HiDownload className='download'/>
              </div>
              <div>
                <MdLightMode className='light-mode'/>
              </div>
              <div>
                <TbMaximize className='maximize'/>
              </div>
            </div>
          </div>
          <Editor lang={langNumber} onEditorChange={handleEditorChang}/>
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


