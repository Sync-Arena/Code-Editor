import React, { useEffect, useRef } from 'react';
import Editor from './assets/Components/Editor';
import { TbBrandCpp, TbMaximize } from "react-icons/tb";
import { FaPython, FaJava } from "react-icons/fa";
import { MdLightMode, MdNightlightRound } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { HiDownload } from "react-icons/hi";
import { VscDebugStart } from "react-icons/vsc";

import './App.css'; 

// <MdNightlightRound />
// <TbMinimize />

// <button className='run'>Run</button>
// <button className='save'>Save</button>

const App = () => {
  return (
    <div className="App">
      <h1>FlexiCode</h1>
      <div className='container'> 
        <div className='languages'>
          <div className='border'></div>
          <div className='cpp lang'>
            <TbBrandCpp />
          </div>
          <div className='py lang'>
            <FaPython />
          </div>
          <div className='java lang'>
            <FaJava />
          </div>
          <div className='border'></div>
        </div>
        <div className='code-area'>
          <div className='header'>
            <div className='file-name'>
              <p>main.cpp</p>
            </div>
            <div className='control-panel'>
             
              <div>
                <VscDebugStart className='run'/>
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
          <Editor />
        </div>
        <div className='input-output-area'>
          <div className='input'>
            <label>Input</label>
            <textarea></textarea>
          </div>
          <div className='output'>
            <label>Output</label>
            <textarea></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
